import mongoose from "mongoose";

const { Schema } = mongoose;

const ArchivoSchema = new Schema({
  titulo: {type: String, required: [true, "Ingresar titulo pls"]},
  descripcion: {type: String, required: [true, "Ingresar descripcion pls"]}
});

export default mongoose.models.Archivo || mongoose.model('Archivo', ArchivoSchema);