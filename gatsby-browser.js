/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
// import "prismjs/themes/prism-coy.css";
// import "prismjs/themes/prism-dark.css";
// import "prismjs/themes/prism-okaidia.css";
// import "prismjs/themes/prism-tomorrow.css";
// import "prismjs/themes/prism-solarizedlight.css";
import "prismjs/themes/prism-twilight.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";


export const onServiceWorkerUpdateFound = () => {
  const answer = window.confirm(
      `好久不见，站点已经更新了。` +
      `重新加载，展示新页面？`
  )

  if (answer === true) {
      window.location.reload()
  }
}
