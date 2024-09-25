import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

const uploadFile = async (file)=>{
    const storageRef = ref(storage, file.name);
    //lưu file lên firebase
  const response = await uploadBytes(storageRef, file);
    //lấy đg dẫn đến file vừa tạo
  const downloadURL = await getDownloadURL(response.ref);
  return downloadURL;
}

export default uploadFile;