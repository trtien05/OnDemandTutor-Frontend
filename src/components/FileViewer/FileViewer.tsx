import React, { useEffect, useState } from 'react'
import { Image } from 'antd'
interface FileViewerProps {
  fileUrl: string;
  alt: string;
  width: string;
  height?: string;
}

const FileViewer: React.FC<FileViewerProps> = (props) => {
  const [fileType, setFileType] = useState<string>('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const handlePreview = async (url: string) => {
    setPreviewImage(url);
    console.log(fileType)
    setPreviewOpen(true);
  };

  useEffect(() => {
    const getFileType = async () => {
      try {
        const response = await fetch(props.fileUrl, { method: 'HEAD', mode: 'no-cors' });
        if (response.ok) {
          setFileType(response.headers.get('Content-Type') || '');
        } else {
          console.error('Failed to fetch the file', response.status);
        }
      } catch (error) {
        console.error('Error fetching the file', error);
      }
    };
    getFileType();
  }, [props.fileUrl])
  return (
    <>
      <canvas ref={}
       // alt="certificate"
        style={{ margin: `auto`, borderRadius: `20px` }}
        width={`100`}
        onClick={(e) => handlePreview((e.target as HTMLImageElement).src)} />
      {previewImage && (
        <Image
          wrapperStyle={{
            height: "200%",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
          style={{ display: 'none' }} // Ensure the image is not displayed
        />
      )}
    </>
  )
}

export default FileViewer