function np(mainWindow) {
	const electron = require('electron')
	const ipc = electron.ipcMain
	ipc.on('itunes', async (e, args) => {
		console.log('Access')
		if (args[0] == 'set') {
		} else {
			var platform = process.platform
			var bit = process.arch
			if (platform == 'darwin') {
				try {
					const nowplaying = require('itunes-nowplaying-mac')
					let value = await nowplaying()
					const artwork = await nowplaying.getThumbnailBuffer(value.databaseID)
					const base64 = artwork.toString('base64')
					value.artwork = base64
					e.sender.webContents.send('itunes-np', value)
				} catch (error) {
					// エラーを返す
					console.error(error)
					e.sender.webContents.send('itunes-np', error)
				}
			} else {
			}
		}
    })
    
}
exports.TheDeskNowPlaying = np
