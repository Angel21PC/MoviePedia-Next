import EditorJs from "@appigram/react-editor-js";

export interface EditorProps {}

const Editor: React.SFC<EditorProps> = (...props) => {
  let editor = null;

  const onChange = async () => {
    try {
      const outputData = await editor.save();
      console.log("Article data: ", outputData);
    } catch (e) {
      console.log("Saving failed: ", e);
    }
  };

  const onSave = async () => {
    try {
      const outputData = await editor.save();
      console.log("Article data: ", outputData);
    } catch (e) {
      console.log("Saving failed: ", e);
    }
  };

  return <div></div>;
};

export default Editor;
