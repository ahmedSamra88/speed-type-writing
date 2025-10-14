const { app, BrowserWindow, Menu, screen } = require('electron');
const path = require('path');

function createWindow() {
  // Get the primary display size (for any monitor / screen)
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width,
    height,
    frame: true,               // keep the title bar and Close (X)
    resizable: true,          // disable resize
    minimizable: true,        // hide minimize
    maximizable: true,        // hide maximize
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Remove top menu completely
  Menu.setApplicationMenu(null);

  // Load your app
  win.loadFile('index.html');

  // Position the window to fill the whole screen
  win.setBounds({ x: 0, y: 0, width, height });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
