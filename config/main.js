module.exports = {  
  // Secret key for JWT signing and encryption
  'secret': 'super secret passphrase',
  // Database connection information
  'database': 'mongodb://AyonAB:Ayan1996@ds241489.mlab.com:41489/billing-system',
  // Setting port for server
  'port': process.env.PORT || 5000
}