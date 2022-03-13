import ItemType from "./ItemType";
import CraftingProcess from "./CraftingProcess";

export interface CraftingRecipe {
  inputItems: ItemType[];
  outputItems: ItemType[];
  process: CraftingProcess;
}

const CraftingRecipes: CraftingRecipe[] = [
  {
    inputItems: [ItemType.CopperOre],
    outputItems: [ItemType.CopperIngot],
    process: CraftingProcess.Smelt,
  },
  {
    inputItems: [ItemType.IronOre],
    outputItems: [ItemType.IronIngot],
    process: CraftingProcess.Smelt,
  },
  {
    inputItems: [ItemType.Brine],
    outputItems: [ItemType.ChlorineGas, ItemType.HydrogenGas, ItemType.Lye],
    process: CraftingProcess.Electrolisis,
  },
];

export default CraftingRecipes;
