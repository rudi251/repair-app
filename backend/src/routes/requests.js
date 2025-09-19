const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Request = require('../models/Request');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname,'uploads');
if(!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req,file,cb) => cb(null, UPLOAD_DIR),
  filename: (req,file,cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/', auth, async (req,res) => {
  try {
    const r = new Request({ userId: req.user._id, ...req.body });
    await r.save();
    res.json(r);
  } catch(err){ res.status(500).json({ message: err.message }); }
});

router.get('/', auth, async (req,res) => {
  try {
    const filter = req.user.role === 'user' ? { userId: req.user._id } : {};
    const items = await Request.find(filter).populate('userId','email fullName').sort({ createdAt: -1 });
    res.json(items);
  } catch(err){ res.status(500).json({ message: err.message }); }
});

router.get('/:id', auth, async (req,res) => {
  try {
    const item = await Request.findById(req.params.id).populate('userId','email fullName');
    if(!item) return res.status(404).json({ message: 'Not found' });
    if(req.user.role === 'user' && String(item.userId._id) !== String(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
    res.json(item);
  } catch(err){ res.status(500).json({ message: err.message }); }
});

router.post('/:id/upload', auth, upload.single('file'), async (req,res) => {
  try {
    const item = await Request.findById(req.params.id);
    if(!item) return res.status(404).json({ message: 'Not found' });
    item.attachments.push({ filename: req.file.filename, originalname: req.file.originalname, path: req.file.path });
    await item.save();
    res.json({ message: 'Uploaded', file: req.file.filename });
  } catch(err){ res.status(500).json({ message: err.message }); }
});

router.put('/:id', auth, async (req,res) => {
  try {
    const item = await Request.findById(req.params.id);
    if(!item) return res.status(404).json({ message: 'Not found' });
    if(req.body.status && !['tech','admin'].includes(req.user.role)) return res.status(403).json({ message: 'Only technician/admin can change status' });
    Object.assign(item, req.body);
    await item.save();
    res.json(item);
  } catch(err){ res.status(500).json({ message: err.message }); }
});

module.exports = router;
