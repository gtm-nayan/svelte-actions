import { Action } from './types';

/**
 * 
 * Call callback when user clicks outside a given element
 * 
 * Usage:
 * <div use:clickOutside={{ enabled: open, cb: () => open = false }}>
 * 
 * Demo: https://svelte.dev/repl/dae848c2157e48ab932106779960f5d5?version=3.19.2
 * 
 */
export function clickOutside(node: HTMLElement, params: {enabled: boolean, cb: Function }): ReturnType<Action> {
  const { enabled: initialEnabled, cb } = params

    const handleOutsideClick = ({ target }: MouseEvent) => {
      if (!node.contains(target as Node)) cb(node); // typescript hack, not sure how to solve without asserting as Node
    };

    function update({enabled}: {enabled: boolean}) {
      if (enabled) {
        window.addEventListener('click', handleOutsideClick);
      } else {
        window.removeEventListener('click', handleOutsideClick);
      }
    }
    update({ enabled: initialEnabled });
    return {
      update,
      destroy() {
        window.removeEventListener( 'click', handleOutsideClick );
      }
    };

}
