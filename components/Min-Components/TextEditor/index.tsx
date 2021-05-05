// import EditorJs from "@appigram/react-editor-js";

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

  return (
    <div>
      {/* <EditorJs
        {...props}
        data={{
          blocks: [
            {
              type: "paragraph",
              data: {
                text: "",
                level: 1,
              },
            },
          ],
        }}
        holder="custom-editor-container"
        onChange={onChange}
        editorInstance={(editorInstance) => {
          editor = editorInstance;
        }}
      >
        <div id="custom-editor-container" />
      </EditorJs> */}
    </div>
  );
};

export default Editor;
