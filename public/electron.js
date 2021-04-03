const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    show: false,
    backgroundColor: '#292929',
  })
  const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
  // mainWindow.webContents.openDevTools()

  mainWindow.loadURL(startURL)
  mainWindow.removeMenu()

  mainWindow.once('ready-to-show', () => mainWindow.show())
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)