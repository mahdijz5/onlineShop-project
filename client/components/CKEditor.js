import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {CKEditor} from '@ckeditor/ckeditor5-react';
const CKEditorWrapper = (props) => {

    return (
        <div>
      <CKEditor
          editor={ ClassicEditor }
          style={{
            maxHeight : "50px"
          }}
          {...props}
      />
    </div>
    )
}
export default CKEditorWrapper;