import plant from './plant';

const index = (use) => {
    const arrayOfUse = { plant }
    return arrayOfUse[use]
}

export { index as default }
