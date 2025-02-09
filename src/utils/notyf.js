import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
  duration: 3000,
  position: {
    x: 'right',
    y: 'bottom',
  },
  ripple: true,
  dismissible: true,
  types: [
    {
      type: 'success',
      background: 'green',
      icon: {
        className: 'fas fa-check',
        tagName: 'i',
      },
    },
    {
      type: 'error',
      background: 'red',
      icon: {
        className: 'fas fa-times',
        tagName: 'i',
      },
    },
  ],
});

export default notyf;