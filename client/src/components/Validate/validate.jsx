export function validate(state){
    let errors = {};
    let expression = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

    if(!state.name){
        errors.name = 'name is required';
    }else if(!/^\w+\s?\w+?\s?\w+?\s?\w+?\s?$/.test(state.name)){
        errors.name = 'Debe contener más de 2 caracteres y como maximo 3 espacios en la receta'
    }else if(!state.summary){
        errors.summary = 'summary is required'
    }else if(!/^\w{2,5}\s?\w+?\s?\w+?\s?\w+?\s?\w+?\s?\w+?\s?\w+?\s?\w+?\s?\w+?\s?\w+?\s?.?$/.test(state.summary)){
        errors.summary='Debe contener más de 10 caracteres y no superar el limite requerido!'
    }else if(!state.spoonacularScore){
        errors.spoonacularScore = 'Score is required'
    }else if(!/^\d{1,2}$/.test(state.spoonacularScore)){
        errors.spoonacularScore = 'Debe tener mas de un digito y menos de 3 digitos.'
    }else if(!state.healthScore){
        errors.healthScore = 'healthScore is required'
    }else if(!/^\d{1,2}$/.test(state.healthScore)){
        errors.healthScore = 'Debe tener mas de un digito y menos de 3 digitos.'
    }else if(!state.analyzedInstructions){
        errors.analyzedInstructions = 'Instructions is required'    
    }else if(!/^\w{2,5}\s?\w+?.?\s?\w+?.?\s?\w+?.?\s?\w+?.?\s?\w+?.?\s?\w+?.?\s?\w+?.?\s?$/.test(state.analyzedInstructions)){
        errors.analyzedInstructions = 'Debe contener mas de 10 caracteres y no superar el limite requerido!'
    }else if (!expression.test(state.image)){
        errors.image = 'La URL es invalida'
    }
    return errors;
}