import { getBoxPresets } from '../repositories/box-presets'
import { getAllPokemon } from '../repositories/pokemon'
import type { BoxPreset, LegacyPokemon, Pokemon } from '../schemas'
import { getDataPath, writeFile, writeFileAsJson } from '../utils/fs'

function updateLegacyBoxPresets(data: BoxPreset[]): void {
  const dataFile = getDataPath('legacy-box-presets.json')
  const result: Record<string, Record<string, BoxPreset>> = {}

  for (const preset of data) {
    result[preset.gameSet] = {
      ...result[preset.gameSet],
      [preset.id]: preset,
    }
  }

  writeFileAsJson(dataFile, result)
}

function updateLegacyPokemonFile(data: Pokemon[]): void {
  const dataFile = getDataPath('legacy-pokemon.json')
  const result: LegacyPokemon[] = []

  for (const pkm of data) {
    const legacyPkm: LegacyPokemon = {
      id: pkm.id,
      nid: pkm.nid,
      dexNum: pkm.dexNum,
      formId: pkm.formId,
      name: pkm.name,
      formName: pkm.formName,
      region: pkm.region,
      generation: pkm.generation,
      type1: pkm.type1,
      type2: pkm.type2,
      color: pkm.color,
      isDefault: pkm.isDefault,
      isForm: pkm.isForm,
      isSpecialAbilityForm: pkm.isSpecialAbilityForm,
      isCosmeticForm: pkm.isCosmeticForm,
      isFemaleForm: pkm.isFemaleForm,
      hasGenderDifferences: pkm.hasGenderDifferences,
      isBattleOnlyForm: pkm.isBattleOnlyForm,
      isSwitchableForm: pkm.isSwitchableForm,
      isMega: pkm.isMega,
      isPrimal: pkm.isPrimal,
      isGmax: pkm.isGmax,
      canGmax: pkm.canGmax,
      canDynamax: pkm.canDynamax,
      canBeAlpha: pkm.canBeAlpha,
      debutIn: pkm.debutIn,
      obtainableIn: pkm.obtainableIn,
      versionExclusiveIn: pkm.versionExclusiveIn,
      eventOnlyIn: pkm.eventOnlyIn,
      storableIn: pkm.storableIn,
      shinyReleased: pkm.shinyReleased,
      shinyBase: pkm.shinyBase,
      baseSpecies: pkm.baseSpecies,
      forms: pkm.isForm ? null : pkm.forms,
      refs: {
        serebii: pkm.refs?.serebii || pkm.id,
        bulbapedia: pkm.refs?.bulbapedia || pkm.name,
        smogon: pkm.refs?.smogon || pkm.id,
        showdown: pkm.psName || pkm.name,
      },
    }
    result.push(legacyPkm)
  }

  writeFile(dataFile, JSON.stringify(result))
}

updateLegacyBoxPresets(getBoxPresets())
updateLegacyPokemonFile(getAllPokemon())
