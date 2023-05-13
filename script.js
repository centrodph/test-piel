class Quiz {
  showClass = 'qshow';
  hideClass = 'qhide';
  optionClass = 'question-option';
  questionClass = 'piel-quiz';
  questions;
  options;
  result;
  current = 1;
  selection = {};

  updateResult = () => {
    const e = document.querySelector('#result');
    e.innerHTML = JSON.stringify(this.selection);
  };
  hideQuestions = () => {
    const options = document.querySelectorAll('.' + this.questionClass);
    options.forEach((option) => {
      option.classList.remove(this.showClass);
      option.classList.remove(this.hideClass);
      option.classList.add(this.hideClass);
    });
  };

  showQuestion = (id) => {
    const e = document.querySelector('#question-' + id);
    e.classList.remove(this.hideClass);
    e.classList.remove(this.showClass);
    e.classList.add(this.showClass);
  };

  selectOptionQuestion = (optionElement) => {
    const { question, option } = optionElement.target.dataset;
    this.selection = {
      ...this.selection,
      [question]: option,
    };
    this.next();
  };

  next = () => {
    this.current = this.current + 1;
    this.hideQuestions();
    this.showQuestion(this.current);
    this.updateResult();
  };
  init = () => {
    this.addHandlers();
    this.showQuestion(this.current);
  };

  addHandlers = () => {
    const options = document.querySelectorAll('.' + this.optionClass);
    console.log(options);
    options.forEach((option) => {
      option.addEventListener('click', this.selectOptionQuestion);
    });
  };
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('quiz piel');
  const quiz = new Quiz();
  quiz.init();
});
