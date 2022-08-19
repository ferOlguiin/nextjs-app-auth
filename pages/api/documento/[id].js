import dbConnect from '../../../lib/dbConnect';
import Archivo from '../../../models/Archivo';

export default async function handler(req, res) {
  await dbConnect();

  const { method, query: {id} } = req;
  switch(method){
    case 'PUT': {
      try {
        
       const archivo = await Archivo.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});

       if(!archivo){
        return res.status(404).json({success: false});
       }

       return res.json({success: true, data: archivo});

      } catch (error) {
        return res.status(404).json({success: false, error});
      }
    }

    case 'DELETE': {
      try {
        
       const archivo = await Archivo.findByIdAndDelete(id);

       if(!archivo){
        return res.status(404).json({success: false});
       }

       return res.json({success: true, data: archivo});

      } catch (error) {
        return res.status(404).json({success: false, error});
      }
    }

    case 'GET': {
      try {
        
       const archivo = await Archivo.findById(id).lean();

       if(!archivo){
        return res.status(404).json({success: false});
       }

       return res.json({success: true, data: archivo});

      } catch (error) {
        return res.status(404).json({success: false});
      }
    }
    default: res.status(500).json({success: false, error: "falla de server"});
  }

}
