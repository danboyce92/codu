import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { ChangeEvent, FunctionComponent } from "react";

import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
  readOnly: boolean;
}

const CodeBlock: FunctionComponent<NodeViewProps & CodeBlockProps> = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
  readOnly,
}) => {
  return (
    <NodeViewWrapper className={styles["code-block"]}>
      {/* Read only mode removes selector ability dropdown - more elegant solution potentially possible */}
      {!readOnly && (
        <select
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          contentEditable={false}
          defaultValue={defaultLanguage}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            updateAttributes({ language: event.target.value });
          }}
        >
          <option value="null">auto</option>
          <option disabled>—</option>
          {extension.options.lowlight
            .listLanguages()
            .map((lang: string, index: number) => (
              <option key={index} value={lang}>
                {lang}
              </option>
            ))}
        </select>
      )}
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeBlock;
