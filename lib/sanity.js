import { PortableText as PortableTextComponent } from "@portabletext/react";
import { config } from "./config";

if (!config.projectId) {
  throw Error(
    "The Project ID is not set. Check your environment variables."
  );
}

const components = {
  types: {
    code: props => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    )
  },
  marks: {
    center: props => (
      <div className="text-center">{props.children}</div>
    ),
    link: props => (
      <a href={props?.mark?.href} target="_blank" rel="noopener">
        {props.children}
      </a>
    )
  }
};
// Set up Portable Text serialization
export const PortableText = props => (
  <PortableTextComponent components={components} {...props} />
);
