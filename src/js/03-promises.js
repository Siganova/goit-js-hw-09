import Notiflix from 'notiflix';

const form = document.querySelector('.form')

form.addEventListener("submit", (e) => {
  e.preventDefault()
  
  const elements = e.currentTarget.elements;
  const amount =  parseInt(elements['amount'].value, 10);
  const delay =  parseInt(elements['delay'].value, 10);
  const step =  parseInt(elements['step'].value, 10);
  let currentDelay = delay;
  for (let i = 0; i < amount; i++){
    const promise = createPromise(i + 1, currentDelay);
    promise.then((data) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${data.position} in ${data.delay}ms`);
    })
    .catch((data) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${data.position} in ${data.delay}ms`);
    })
    currentDelay += step;
  }
})

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}