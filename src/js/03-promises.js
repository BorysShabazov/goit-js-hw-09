import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', submitForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function submitForm(evt) {
  evt.preventDefault();
  const delayArr = [];
  const delayEl = formEl.delay.value;
  const stepEl = formEl.step.value;
  const amountEl = formEl.amount.value;
  let delayPause = Number(delayEl);

  for (let i = 0; i < amountEl; i += 1) {
    delayArr.push(delayPause);
    delayPause += Number(stepEl);

    setTimeout(() => {
      createPromise(i + 1, delayEl)
        .then(({ position, delay }) => {
          delay = delayArr[i];
          Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          delay = delayArr[i];
          Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
    }, delayArr[i]);
  }
}
