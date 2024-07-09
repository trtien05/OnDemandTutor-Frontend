import React, { useEffect, useRef, useState } from 'react'
import { Button, Image } from 'antd'
import { theme } from '../../themes';
interface FileViewerProps {
  fileUrl: string;
  alt: string;
  width?: string;
  height?: string;
  borderRadius?: string;
}

const FileViewer: React.FC<FileViewerProps> = (props) => {
  const [fileType, setFileType] = useState<string>('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const handlePreview = async (url: string) => {
    setPreviewImage(url);
    console.log(fileType)
    setPreviewOpen(true);
  };

  const handleIframeClick = () => {
    window.open(props.fileUrl, '_blank');
  };

  useEffect(() => {
    const iframe = iframeRef.current;

    if (iframe) {
      const onLoad = () => {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          iframeDoc.addEventListener('click', handleIframeClick);
        }
      };

      iframe.addEventListener('load', onLoad);

      return () => {
        iframe.removeEventListener('load', onLoad);
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          iframeDoc.removeEventListener('click', handleIframeClick);
        }
      };
    }
  }, [iframeRef]);


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
              style={{
                position: 'relative',
                width: `${props.width}`,
                height: `${props.height ? props.height : 'unset'}`
              }}>
              <iframe src={props.fileUrl}
                width={props.width}
                ref = {iframeRef}
                style={{ borderRadius: `${props.borderRadius ? props.borderRadius : 0}` }} />
              <Button
                type="default"
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  zIndex: 999,
                  color: `${theme.colors.primary}`,
                  fontWeight: `bold`
                }}
                onClick={handleIframeClick}>View full</Button>
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