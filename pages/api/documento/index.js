import dbConnect from '../../../lib/dbConnect';
import Archivo from '../../../models/Archivo';

export default async function handler(req, res) {
  await dbConnect();

  const {method} = req;
  switch(method){
    case 'POST': {
      try {
        
        const archivo = new Archivo(req.body);
        await archivo.save();

        return res.json();

      } catch (error) {
        console.log(error);
        res.status(400).json({success: false, error: "falla de server"})
      }
    }
    default: res.status(500).json({success: false, error: "falla de server"});
  }

}
