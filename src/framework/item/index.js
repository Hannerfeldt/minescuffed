import plant from './plant';

const index = (use) => {
    const arrayOfUse = { plant }
    console.log('index')
    return arrayOfUse[use]
}

export { index as default }
