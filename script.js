class Quiz {
  showClass = "qshow";
  hideClass = "qhide";
  activeClass = "active";
  optionClass = "question-option";
  questionClass = "piel-quiz";
  stepClass = ".point.steps-";
  finalizarEnabled = false;
  questions;
  options;
  result;
  current = 1;
  selection = {};

  updateResult = () => {
    const e = document.querySelector("#result");
    e.innerHTML = JSON.stringify(this.selection);
  };

  handleFinalizar = (e) => {
    e.preventDefault();
    let cantA = 0;
    let cantB = 0;
    let cantC = 0;
    Object.keys(this.selection).forEach((key) => {
      if (this.selection[key] === "a") cantA++;
      if (this.selection[key] === "b") cantB++;
      if (this.selection[key] === "c") cantC++;
    });
    if (cantA > cantB && cantA > cantC) {
      if (this.selection.manchas && this.selection.lineas) {
        window.location.href = "/rutina-piel-grasa-plus-cuidados.html";
        return;
      }
      if (this.selection.manchas) {
        window.location.href = "/rutina-piel-grasa-manchas.html";
        return;
      }
      if (this.selection.lineas) {
        window.location.href = "/rutina-piel-grasa-lineas-expresion.html";
        return;
      }
      window.location.href = "/rutina-piel-grasa.html";
      return;
    }
    if (cantC > cantA && cantC > cantB) {
      if (this.selection.manchas && this.selection.lineas) {
        window.location.href = "/rutina-piel-seca-plus-cuidados.html";
        return;
      }
      if (this.selection.manchas) {
        window.location.href = "/rutina-piel-seca-manchas.html";
        return;
      }
      if (this.selection.lineas) {
        window.location.href = "/rutina-piel-seca-lineas-expresion.html";
        return;
      }
      window.location.href = "/rutina-piel-seca.html";
      return;
    }
    if (this.selection.manchas && this.selection.lineas) {
      window.location.href = "/rutina-piel-mixta-plus-cuidados.html";
      return;
    }
    if (this.selection.manchas) {
      window.location.href = "/rutina-piel-mixta-manchas.html";
      return;
    }
    if (this.selection.lineas) {
      window.location.href = "/rutina-piel-mixta-lineas-expresion.html";
      return;
    }
    window.location.href = "/rutina-piel-mixta.html";
    return;
  };

  hideQuestions = () => {
    const options = document.querySelectorAll("." + this.questionClass);
    options.forEach((option) => {
      option.classList.remove(this.showClass);
      option.classList.remove(this.hideClass);
      option.classList.add(this.hideClass);
    });
  };

  showQuestion = (id) => {
    const e = document.querySelector("#question-" + id);
    e.classList.remove(this.hideClass);
    e.classList.remove(this.showClass);
    e.classList.add(this.showClass);
  };

  selectOptionQuestion = (optionElement) => {
    this.activeStep();
    const { question, option } = optionElement.target.dataset;
    if (question === "6") {
      this.selection = {
        ...this.selection,
        [option]: true,
      };
      const input = document.querySelector("input[name='" + option + "']");
      input.checked = !input.checked;
    } else {
      this.selection = {
        ...this.selection,
        [question]: option,
      };

      this.next();
    }
  };

  activeStep = () => {
    const e = document.querySelector(this.stepClass + this.current);
    e.classList.add(this.activeClass);
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
    const options = document.querySelectorAll("." + this.optionClass);

    document
      .querySelector(".quiz-finalizar")
      .addEventListener("click", this.handleFinalizar);

    options.forEach((option) => {
      option.addEventListener("click", this.selectOptionQuestion);
    });
  };
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("quiz piel");
  const quiz = new Quiz();
  quiz.init();
});
