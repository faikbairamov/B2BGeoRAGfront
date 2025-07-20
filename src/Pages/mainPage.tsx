import React, { useState } from 'react';
import '../PageStyles/MainPageCSS.css';
import Navbar from '../Components/Navbar';
type FileBoxProps = {
  name: string;
  ext: string;
  onDelete: () => void;
};

const FileBox: React.FC<FileBoxProps> = ({ name, ext, onDelete }) => (
  <div className="mainpage-file-box">
    <span>{name}</span>
    <span className="mainpage-file-ext" style={{ color: "var(--text-main)" }}>{ext}</span>
    <button className="delete-file-btn" onClick={onDelete} title="Remove file">✕</button>
  </div>
);

function MainPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [question, setQuestion] = useState('');
  const [sending, setSending] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => {
        const allFiles = [...prevFiles, ...newFiles];
        const uniqueFiles = Array.from(
          new Map(allFiles.map(f => [f.name, f])).values()
        );
        return uniqueFiles;
      });
      e.target.value = '';
    }
  };

  const getNameAndExtension = (filename: string) => {
    const lastDot = filename.lastIndexOf('.');
    if (lastDot === -1) return { name: filename, ext: '' };
    return {
      name: filename.slice(0, lastDot),
      ext: filename.slice(lastDot)
    };
  };

  const handleDeleteFile = (filename: string) => {
    setFiles(prevFiles => prevFiles.filter(f => f.name !== filename));
  };

  const handleSendFiles = async () => {
    if (files.length === 0) {
      alert('Please select at least one PDF file.');
      return;
    }
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    if (pdfFiles.length === 0) {
      alert('Only PDF files are allowed.');
      return;
    }
    setSending(true);
    const formData = new FormData();
    pdfFiles.forEach(file => formData.append('files', file));
    // Optionally add userId if you have it, e.g.:
    // formData.append('userId', userId);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        alert('Files sent successfully!');
        setFiles([]);
      } else {
        console.error('Upload error:', data);
        alert(`Failed to send files. ${data.error || data.message || ''}`);
      }
    } catch (err) {
      alert('Error sending files.');
      console.error('Network error:', err);
    }
    setSending(false);
  };

  return (
    <div className="container">
      <Navbar/>
      <h2 className="mainpage-title" style={{marginTop:200}}>Upload your files</h2>
      <div className="mainpage-fields">
        <div className="mainpage-field">

        <label className="custom-file-upload">
          <input
            type="file"
            multiple
            accept="application/pdf"
            className="mainpage-file-input"
            onChange={handleFileChange}
          />
          Select PDF Files
        </label>
          <div className="mainpage-helper-text">
            You can select multiple PDF files at once, or add more later.
          </div>
          <div className="mainpage-file-list">
            {files.map((file, idx) => {
              const { name, ext } = getNameAndExtension(file.name);
              return (
                <FileBox
                  key={idx}
                  name={name}
                  ext={ext}
                  onDelete={() => handleDeleteFile(file.name)}
                />
              );
            })}
          </div>
          <button
            className="supabase-btn"
            style={{ marginTop: 16 }}
            onClick={handleSendFiles}
            disabled={sending || files.length === 0}
          >
            {sending ? 'Sending...' : 'Send Files'}
          </button>
        </div>
      
      </div>
    </div>
  );
}

export default MainPage;