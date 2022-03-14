enum ItemType {
  // Raw Items
  CopperOre = "Copper Ore",
  IronOre = "Iron Ore",
  CrudeOil = "Crude Oil",
  Coal = "Coal",
  Brine = "Brine",
  Sand = "Sand",
  Wood = "Wood",
  // Crafted Items
  CopperIngot = "Copper Ingot",
  IronIngot = "Iron Ingot",
  Salt = "Salt",
  ChlorineGas = "Chlorine Gas",
  HydrogenGas = "Hydrogen Gas",
  Lye = "Lye",
}

export const rawItems = [
  ItemType.CopperOre,
  ItemType.IronOre,
  ItemType.CrudeOil,
  ItemType.Coal,
  ItemType.Brine,
  ItemType.Sand,
  ItemType.Wood,
];

export default ItemType;
