import { greetUser } from '$utils/greet';

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'Mateusz Fabjan12';
  greetUser(name);
});
