const frameModule = require("ui/frame");

exports.goToQuizList = function () {
    const topmost = frameModule.topmost();
    topmost.navigate("views/quiz-list-view/quiz-list-view");
}
