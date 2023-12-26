import { FormArray, FormGroup } from "@angular/forms"
import { ObjectCell, RequestParam } from "src/app/core/models/endpoint.model"

export function obtenerObjetoFormGroup(formGroup:FormGroup, formArrayName:string){
    const bodyFormArray = formGroup.get(formArrayName) as FormArray
  
    const objectsCells:ObjectCell[] = bodyFormArray.controls.map(c => {
      const objectCell:ObjectCell = {
        type: c.get('type')!.value,
        nombre:  c.get('nombre')!.value
      }
  
      if (objectCell.type === 'Object'){     
        objectCell.content = obtenerObjetoFormGroup(c as FormGroup, formArrayName)
        return objectCell
      } 
  
      if (objectCell.type === 'Array'){
        const arrayValue = c.get('arrayValue')!.value
        objectCell.content = arrayValue === 'Object'
          ? obtenerObjetoFormGroup(c as FormGroup, formArrayName)
          : arrayValue
  
        return objectCell
      }
  
      return objectCell
    })
  
    return objectsCells
}



export function obtenerParamsFormGroup(formGroup:FormGroup, formArrayName:string){
    const bodyFormArray = formGroup.get(formArrayName) as FormArray
    const objectsCells:RequestParam[] = bodyFormArray.controls.map(c => {
      const objectCell:RequestParam = {
        type: c.get('type')!.value,
        nombre:  c.get('nombre')!.value
      }
      return objectCell
    })
  
    return objectsCells
}


export function getObjectFromObjectCell(objCell:ObjectCell[]){
    const objectFormated:any = {}
    
    objCell.forEach(o => {
        if (o.type === 'Array' && o.content && typeof o.content === 'string')
            objectFormated[o.nombre] = [o.content]
        
        else if (o.type === 'Array' && o.content && typeof o.content !== 'string')
            objectFormated[o.nombre] = [getObjectFromObjectCell(o.content)]
        
        else if (o.type === 'Object') 
            objectFormated[o.nombre] = getObjectFromObjectCell(o.content as ObjectCell[])
        
        else objectFormated[o.nombre] = o.type
    })

    return objectFormated
}


export function getObjectFromParams(objCell:RequestParam[]){
    const objectFormated:any = {}
    
    objCell.forEach(o => {
        objectFormated[o.nombre] = o.type
    })

    return objectFormated
}