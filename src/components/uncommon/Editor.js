import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});
function Editor({ onChange, editorLoaded, name, value }) {
  const handleChange = html => {
    onChange(html);
  };
  return (
    <div>
      {editorLoaded ? (
        <QuillNoSSRWrapper
          theme='snow'
          name={name}
          onChange={handleChange}
          value={value}
          modules={{
            toolbar: [
              [{ header: '1' }, { header: '2' }, { font: [] }],
              [{ size: [] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' }
              ],
              ['link', 'image', 'video'],
              ['clean']
            ],
            clipboard: {
              // toggle to add extra line breaks when pasting HTML:
              matchVisual: false
            }
          }}
          formats={[
            'header',
            'font',
            'size',
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'list',
            'bullet',
            'indent',
            'link',
            'image',
            'video'
          ]}
          bounds={'.app'}
          placeholder='text here'
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}
export default Editor;
