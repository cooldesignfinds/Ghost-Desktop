import Helper from '@ember/component/helper';

export function firstLetter(params) {
    return params[0].slice(0, 1);
}

export default Helper.helper(firstLetter);
