import React, { useState } from 'react';
import '../PageStyles/MainPageCSS.css';

type FileBoxProps = {
  name: string;
  ext: string;
};

const FileBox: React.FC<FileBoxProps> = ({ name, ext }) => (
  <div className="mainpage-file-box">
    <span>{name}</span>
    <span className="mainpage-file-ext">{ext}</span>
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
    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('Files sent successfully!');
        setFiles([]);
      } else {
        alert('Failed to send files.');
      }
    } catch (err) {
      alert('Error sending files.');
    }
    setSending(false);
  };

  return (
    <div className="container">
      <h2 className="mainpage-title">Upload Files & Ask a Question</h2>
      <div className="mainpage-fields">
        <div className="mainpage-field">
          <label className="mainpage-label">
            File Upload Section
          </label>
          <input
            type="file"
            multiple
            accept="application/pdf"
            className="mainpage-file-input"
            onChange={handleFileChange}
          />
          <div className="mainpage-helper-text">
            You can select multiple PDF files at once, or add more later.
          </div>
          <div className="mainpage-file-list">
            {files.map((file, idx) => {
              const { name, ext } = getNameAndExtension(file.name);
              return <FileBox key={idx} name={name} ext={ext} />;
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
        <div className="mainpage-field">
          <label className="mainpage-label">
            Your Question
          </label>
          <textarea
            className="large-scrollable-textarea"
            placeholder="Type your question here..."
            value={question}
            onChange={e => setQuestion(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default MainPage;