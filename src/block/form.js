/**
 * BLOCK: paperform-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./editor.scss";
import "./style.scss";
console.log(wp);
const { RichText, InnerBlocks } = wp.editor;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

function extractFormId(str) {
  if (!str || typeof str !== "string") {
    return "";
  }
  //Standard paperform link
  if (str.includes(".paperform.co")) {
    str = str.split("://").pop();
    return str.split(".")[0];
  }
  if (!str.includes(".")) {
    return str;
  }
  //custom domain
  str = str.split("?")[0];
  if (str.endsWith("/")) {
    str = str.slice(0, -1);
  }
  return str.split("/").pop();
}

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("paperform/form", {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("Paperform"), // Block title.
  icon: {
    foreground: "#489AC2",
    src: (
      <svg
        width="639px"
        height="639px"
        viewBox="0 0 639 639"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="Artboard"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="Logo--solid"
            transform="translate(160.000000, 54.000000)"
            fill="#489AC2"
            fillRule="nonzero"
          >
            <path
              d="M28.1057269,1.32904979 L63.2378855,1.32904979 C78.7602498,1.32904979 91.3436123,13.9095146 91.3436123,29.4283044 L91.3436123,502.900745 C91.3436123,518.419535 78.7602498,531 63.2378855,531 L28.1057269,531 C12.5833625,531 0,518.419535 0,502.900745 L0,29.4283044 C0,13.9095146 12.5833625,1.32904979 28.1057269,1.32904979 Z M168.33844,4.19193673 L304.651216,85.8066195 C313.552038,91.1358173 319,100.746412 319,111.118899 L319,216.385917 C319,226.771265 313.538626,236.391804 304.62025,241.716712 L168.307475,323.105179 C154.31444,331.46002 136.196347,326.891974 127.839582,312.902163 C125.107687,308.328777 123.665198,303.101265 123.665198,297.774384 L123.665198,29.5042174 C123.665198,13.2094877 136.877729,0 153.176211,0 C158.516568,0 163.756839,1.44879055 168.33844,4.19193673 Z"
              id="Shape"
            ></path>
          </g>
        </g>
      </svg>
    ),
  }, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: "embed", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [
    __("Paperform"),
    //__( 'CGB Example' ),
    //__( 'create-guten-block' ),
  ],
  attributes: {
    formURL: {
      type: "string",
      source: "attribute",
      attribute: "form-url",
      selector: "[form-url]",
    },
    isButton: {
      type: "string",
      source: "attribute",
      attribute: "popup-button",
      selector: "[popup-button]",
    },
    isLazy: {
      type: "string",
      source: "attribute",
      attribute: "lazy",
      selector: "[lazy]",
    },
    spinner: {
      type: "string",
      source: "attribute",
      attribute: "spinner",
      selector: "[spinner]",
    },
    inheritsPrefill: {
      type: "string",
      source: "attribute",
      attribute: "prefill-inherit",
      selector: "[prefill-inherit]",
    },
    noScroll: {
      type: "string",
      source: "attribute",
      attribute: "no-scroll",
      selector: "[no-scroll]",
    },
    scrollOffset: {
      type: "string",
      source: "attribute",
      attribute: "scroll-offset",
      selector: "[scroll-offset]",
    },
    height: {
      type: "string",
      source: "attribute",
      attribute: "height",
      selector: "[height]",
    },
  },

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */
  edit: (props) => {
		console.log(props)
    // Creates a <p class='wp-block-cgb-block-paperform-block'></p>.
    return (
      <div className={props.className}>
        <label htmlFor="form">Form URL</label>
        <RichText
          name="form"
          c={`${props.className}__input`}
          value={props.attributes.formURL}
          onChange={(e) => props.setAttributes({ formURL: e })}
          placeholder={"https://my-form.paperform.co"}
        />
        <label htmlFor="isButton">
          Use a popup button{" "}
          <input
            name="isButton"
            type="checkbox"
            checked={Number(props.attributes.isButton)}
            onChange={(e) =>
              props.setAttributes({ isButton: e.target.checked ? 1 : 0 })
            }
          />
        </label>
        {props.attributes.isButton ? (
          <div className={props.className + "__preview"}>
            <InnerBlocks
              template={[["core/button", {}]]}
              templateLock="all"
              allowedBlocks={["core/button"]}
            />
          </div>
        ) : null}
        <label htmlFor="advanced">
          See advanced settings{" "}
          <input
            name="advanced"
            type="checkbox"
            checked={Number(props.attributes.seeAdvanced)}
            onChange={(e) =>
              props.setAttributes({ seeAdvanced: e.target.checked ? 1 : 0 })
            }
          />
        </label>
        {props.attributes.seeAdvanced ? (
          <div className={`${props.className}__advanced`}>
            <label htmlFor="lazy">
              Lazy load{" "}
              <input
                name="isLazy"
                type="checkbox"
                checked={Number(props.attributes.isLazy)}
                onChange={(e) =>
                  props.setAttributes({ isLazy: e.target.checked ? 1 : 0 })
                }
              />
            </label>
            <label htmlFor="spinner">
              Show a spinner{" "}
              <input
                name="spinner"
                type="checkbox"
                checked={Number(props.attributes.spinner)}
                onChange={(e) =>
                  props.setAttributes({ spinner: e.target.checked ? 1 : 0 })
                }
              />
            </label>
            <label htmlFor="prefillInherit">
              Allow pre-filling through the URL{" "}
              <input
                name="prefillInherit"
                type="checkbox"
                checked={Number(props.attributes.inheritsPrefill)}
                onChange={(e) =>
                  props.setAttributes({
                    inheritsPrefill: e.target.checked ? 1 : 0,
                  })
                }
              />
            </label>
            <label htmlFor="noScroll">
              Disable automatic scrolling{" "}
              <input
                name="noScroll"
                type="checkbox"
                checked={Number(props.attributes.noScroll)}
                onChange={(e) =>
                  props.setAttributes({ noScroll: e.target.checked ? 1 : 0 })
                }
              />
            </label>
            <label htmlFor="scrollOffset">Scroll offset (px)</label>
            <RichText
              name="scrollOffset"
              c={`${props.className}__input`}
              type="number"
              step={1}
              value={String(props.attributes.scrollOffset || "")}
              onChange={(e) =>
                props.setAttributes({
                  scrollOffset: Number.isNaN(Number(e)) ? "" : e,
                })
              }
            />

            <label htmlFor="height">Height (guided mode only)</label>
            <RichText
              name="height"
              c={`${props.className}__input`}
              placeholder={"E.g. 600px, 50vh, 30rem"}
              value={String(props.attributes.height || "")}
              onChange={(e) => props.setAttributes({ height: e })}
            />
            <br />
            <small>
              <a
                target="_blank"
                rel="noreferrer nofollow"
                href="https://paperform.co/help/articles/embed-forms"
              >
                Read the docs...
              </a>
            </small>
          </div>
        ) : null}
      </div>
    );
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */
  save: (props) => {
		console.log(props)
    if (!props.attributes.formURL) {
      return <div></div>;
    }
    const formId = extractFormId(props.attributes.formURL);
    const El = props.attributes.isButton ? Span : Div;
    const attrs = {
      "data-paperform-id": formId,
      wp: "1",
    };
    if (props.attributes.isButton) {
      attrs["popup-button"] = "1";
    }

    if (props.attributes.isLazy) {
      attrs.lazy = "1";
    }
    if (props.attributes.spinner) {
      attrs.spinner = "1";
    }
    if (props.attributes.inheritsPrefill) {
      attrs["prefill-inherit"] = "1";
    }

    if (props.attributes.scrollOffset) {
      attrs["scroll-offset"] = String(props.attributes.scrollOffset);
    }

    if (props.attributes.height) {
      attrs.height = props.attributes.height;
    }
    if (props.attributes.scrollOffset) {
      attrs["no-scroll"] = "1";
    }

    return (
      <div className={props.className} form-url={props.attributes.formURL}>
        <El {...attrs}>
          {props.attributes.isButton ? <InnerBlocks.Content /> : null}
        </El>
        <noscript>
          <div>
            Javascript is disabled in your browser, please enable it to be able
            to{" "}
            <a href={`https://${formId}.paperform.co`}>fill out this form.</a>
          </div>
          <small>
            <a href="https://paperform.co/wordpress">Powered by Paperform</a>
          </small>
        </noscript>
        <script src="https://paperform.co/__embed.min.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
					document.querySelectorAll('[data-paperform-id] a').forEach(function(node) {
						node.addEventListener('click', function(e) {
							e.preventDefault();
						})
					})
				})()`,
          }}
        ></script>
      </div>
    );
  },
});
const Div = (props) => <div {...props}>{props.children}</div>;
const Span = (props) => <span {...props}>{props.children}</span>;
