const { google } = require("googleapis")
const {GoogleAuth} = require('google-auth-library');
const path = require('path');

const authentication = async() => {
    
    const SCOPES = ['https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/spreadsheets','https://www.googleapis.com/auth/spreadsheets.readonly' ];
  
    const auth = new GoogleAuth ({
      credentials:{
        type: "service_account",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/drive-uploader%40mtactivists.iam.gserviceaccount.com",
    
        private_key:'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC0rxMLK7DCOrtD\n5cTD8onP8XDxfHJ3g4r1wJHPYVmZl8TK7/+Ryy27xiMsVmPmnbWzMvDOV31aSU+s\nQUR8Y8vosaUOWhbUOHxVLLFHjo+XBVClB6e2Pcu0SEynf4405amlmP2qdEIHuXAV\nHKnKa009ugmH0iSbeDF+THaStbNfl8TDhcAtm6nPY8DQzTyle9daOAwu7307hXA5\n5q3zfgPWe9+aEmdeg8b2wH/crYB6FFbgH8s9wQxSdQoTqtHU58RkRp0R5iwOGZff\nHFoNNktrGYu7euOdmi2X+lOvB1NEzO6Yjn0jB82/VvUgh1c6JwJWh0uQkX8ow3Sl\nbBEcT9FhAgMBAAECggEAAtEMW1MY6Cw1dV1gc/wEyzOssq0BlUydBs/zze9q78ai\nhBXZ7m5EBh50d6lYmRSaC6M2hwbs3rKQHgOt80D0gan8RFUh8Di5snO2B0MpCJ4F\n9+6evgvoUCUE4eMOhtNSMdFI2gaCLX/l6ARYfr3tuDG9WotLdAt7fQgo3Ihd1ZZ/\nvOxjsQ1WrFPF8eW0AcK+QK6XMcHc+KRL6VYqlW05v9SrfaefNbS+LbuPNhU1dD1W\nJ0bFDFAmELrHOpiuEJTooxzH36k/TUPt8L488fZtyXSz2HDacE9uTM6kLziRIP/l\n1KjKOS4Yjxdviftk3XmP/4OWx88a/565EzyemxGFOQKBgQDjRPsfAFDptz1WqCM4\nBWz7jb2rRh7HwmpQ2/yr6gGs06NPH+2zGvzcQ5Z+GTI9BMA691go0S8kMDS/uMrB\nH8hWMyj67VL+ufbFdJUNaTpDicHyWjUSMzgsUXHCg65WMTkMXO24u1izZiEK4Tjf\nUUJbEGEfVYSURzRJOIl2wiakSQKBgQDLhncuRM7IEkZbtSv36tM/jH5rOKxxUFHE\nZ2KmxVgWOMXAugNpKfLCHKFkPNhwa1OSb+zLt8n5NCzxhieY3TjvVG/b2o99gu/O\n9W5ZxvDZRQt45M8ysayuji7ccNorYtE5g8vlhUQ7mPQa0WmBvyB8h9+ffgP55Ap4\nJQN38bMUWQKBgHnQRGVGbxgGLitfbZkeV16xh0LhD6h0TTXP46tlfsZanYLQk0BX\nq8aHt4cZDDNmc35niuo9zO2xpORKMOq4lVGWlFWClOSRWnJVXXrVtvPyR3EV5rI9\nn9MpSDdBC1WJhpFY0dYdHJrzl6xUMX6I+G8E5Xm9BZXQYHcKhauQvtN5AoGBAMFl\nJez2f1OIYgkU8BHltxTk6N/z+5C1VO1/nDOCxMBg9DC90S3mKYKgeA/q7XRt1/0H\nlAjEvQyrsqVS6F+On2J0ZtKQLdeDS2LqvxBaRVUAEfWv3t96C+/WtdrM9dNSVCQG\nBAM2jm7fWd397fbXagRLjIhe02JqejROX6xjJNsJAoGAFD0Y/tSubo/lhZM4Z7BM\nOo6n8qx+6ZB7zL9v0r6EfH//go6aw93jn2Wfg3UjUGijwO+LvgxuU2tY7SEZdA6t\n+4Lj5x6lDmVwWyWckK7fBIkoQZEls/SE6ljR9NTqwOaDzl8b2gP8RM7nYWxy8Cdq\n+uwpzCXr+YysNOn728bqzh0=\n-----END PRIVATE KEY-----\n',
        client_email:'drive-uploader@mtactivists.iam.gserviceaccount.com',
        private_key_id:'71ca68c2eecf5d1cec84815213ed8354a776af1e',
        project_id: "mtactivists",
    
        },
      scopes: SCOPES,
    });
    const driveService = google.drive({ version: 'v3', auth });

    const client = await auth.getClient();
    const sheets = google.sheets({
        version:'v4',
        auth:client
    });
    return {sheets};
    
    
  };

module.exports=authentication;