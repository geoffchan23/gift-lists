const express = require('express')
const router = express.Router()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const uniqid = require('uniqid');

router.post('/', async (req, res) => {
  const {
    name,
    createdBy,
    password,
  } = req.query;

  const id = uniqid();

  await db.get('lists')
    .push({
      id,
      name,
      createdBy,
      createdOn: new Date(),
      people: [],
      password,
    })
    .write()

  res.json({ id });
})

router.get('/:id', (req, res) => {
  const list = db.get('lists')
    .find({ id: req.params.id })
    .value() || {}
  
  const translatedList = {...list}
  delete translatedList.password;

  if (!list.password || list.password === '') {
    res.json(translatedList)
  }

  if (list.password && list.password !== '') {
    
    if (!req.query.password || req.query.password === '') {
      res.json({
        error: 1,
        msg: 'No password sent'
      })
    } else if (req.query.password !== list.password) {
      res.json({
        error: 2,
        msg: 'Please enter the correct password for this list'
      })
    } else if (req.query.password === list.password) {
      res.json(translatedList)
    }
  }
})

router.get('/', (req, res) => {
  const lists = db.get('lists')
    .filter({ createdBy: req.query.email })
    .value()

  res.json(
    lists.map(
      ({
        name,
        createdBy,
        createdOn,
        id
      }) => ({
        name,
        createdBy,
        createdOn,
        id
      })
    )
  )
})

router.patch('/:id', (req, res) => {
  db.get('lists')
    .find({ id: req.params.id })
    .assign({ people: req.body })
    .write()
  res.json({
    msg: 'ok'
  })
})

module.exports = router