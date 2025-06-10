import { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    education: "",
    experience: "",
    photo: null,
    template: "ats"
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: URL.createObjectURL(files[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const generatePDF = async () => {
    const input = document.getElementById("cv-preview");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("cv.pdf");
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">CV Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form className="space-y-2">
          <input type="text" name="name" placeholder="Nama Lengkap" onChange={handleChange} className="w-full p-2 border" />
          <input type="text" name="phone" placeholder="Nomor Telepon" onChange={handleChange} className="w-full p-2 border" />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border" />
          <textarea name="address" placeholder="Alamat" onChange={handleChange} className="w-full p-2 border"></textarea>
          <textarea name="education" placeholder="Pendidikan" onChange={handleChange} className="w-full p-2 border"></textarea>
          <textarea name="experience" placeholder="Pengalaman" onChange={handleChange} className="w-full p-2 border"></textarea>
          <input type="file" name="photo" accept="image/*" onChange={handleChange} className="w-full" />
          <select name="template" onChange={handleChange} className="w-full p-2 border">
            <option value="ats">Template ATS</option>
            <option value="kreatif">Template Kreatif</option>
          </select>
          <button type="button" onClick={generatePDF} className="px-4 py-2 bg-blue-600 text-white rounded">
            Generate PDF
          </button>
        </form>
        <div id="cv-preview" className="p-4 border bg-white">
          {formData.template === "ats" ? (
            <div>
              <h2 className="text-xl font-bold">{formData.name}</h2>
              <p>{formData.phone} | {formData.email}</p>
              <p>{formData.address}</p>
              <hr className="my-2" />
              <h3 className="font-semibold">Pendidikan</h3>
              <p>{formData.education}</p>
              <h3 className="font-semibold mt-2">Pengalaman</h3>
              <p>{formData.experience}</p>
            </div>
          ) : (
            <div className="flex gap-4">
              {formData.photo && (
                <img src={formData.photo} alt="Foto" className="w-24 h-24 object-cover rounded-full" />
              )}
              <div>
                <h2 className="text-xl font-bold text-pink-600">{formData.name}</h2>
                <p className="text-gray-600">{formData.phone} | {formData.email}</p>
                <p>{formData.address}</p>
                <div className="mt-2">
                  <h3 className="font-semibold">Pendidikan</h3>
                  <p>{formData.education}</p>
                  <h3 className="font-semibold mt-2">Pengalaman</h3>
                  <p>{formData.experience}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
    }
