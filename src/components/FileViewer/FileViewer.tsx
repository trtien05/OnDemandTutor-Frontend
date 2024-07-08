import React, { useEffect, useState } from 'react'
import { Image } from 'antd'
interface FileViewerProps {
  fileUrl: string;
  alt: string;
  width: string;
  height?: string;
  borderRadius?: string;
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

  const handleIframeClick = () => {
    window.open(props.fileUrl, '_blank');
  };
  useEffect(() => {
    const getFileType = async () => {
      const decodedUrl = decodeURIComponent(props.fileUrl);
      const path = new URL(decodedUrl).pathname;
      const ext = path.split('.').pop();
      setFileType(ext ? ext.toLowerCase() : '');

    };
    getFileType();
  }, [props.fileUrl])

  return (
    <>
      {fileType === 'pdf' ?
        (
          <>
            <div 
              style={{ position: 'relative', 
                width: `${props.width}`, 
                height:`${props.height?props.height:'unset'}` }}>
              <iframe src={props.fileUrl}
                width={props.width}
                style={{ borderRadius: `${props.borderRadius ? props.borderRadius : 0}` }} />
              <div
                onClick={handleIframeClick}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer'
                }}
              />
            </div>

          </>

        ) : (
          <>
            <img src={props.fileUrl}
              alt={props.alt}
              style={{ margin: `auto`, borderRadius: `${props.borderRadius ? props.borderRadius : '0px'}` }}
              width={props.width}
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
        )}
    </>
  )
}

export default FileViewer