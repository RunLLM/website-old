// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//     if (stage === 'build-html' || stage === 'develop-html') {
//         actions.setWebpackConfig({
//             module: {
//                 rules: [
//                     {
//                         test: /tournament/,
//                         use: loaders.null(),
//                     },
//                 ],
//             },
//         });
//     }
// };