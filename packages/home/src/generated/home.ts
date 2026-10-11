// The Blupinta home format, version 6: its types, generated from its JSON Schema
// (schema/home.schema.json, published at https://blupinta.app/schema/home-6.json). Generated: don't edit it by hand.

/** The version of the format these types describe: a home's `schema` */
export const HOME_SCHEMA_VERSION = 6

/**
 * @minItems 2
 * @maxItems 2
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Pt".
 */
export type Pt = [X, Y];
export type X = number;
export type Y = number;
/**
 * the sheet point that becomes the plan's (0, 0) in metres
 *
 * @minItems 2
 * @maxItems 2
 */
export type Pt1 = [X, Y];
/**
 * Where one of the house's measures comes from: typed by the person, or typical (of the house's era when it was chosen, else the usual one), an assumption said so wherever it shows
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "MeasureSource".
 */
export type MeasureSource =
  | {
      kind: "typed";
    }
  | {
      kind: "typical";
      era?: BuildEra;
    };
/**
 * How a house was built, for the measures typical of it (`houseDefaults.ts` `ERA_MEASURES`, their sources in floor-plan-editor.md §8c)
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "BuildEra".
 */
export type BuildEra = "1960s-1980s" | "recent" | "class-a";
/**
 * A room's id: the name used at home and by the devices that name it (external)
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "RoomId".
 */
export type RoomId = string;
/**
 * parquet, gres, concrete: indoor · outdoor: balconies, a step down, no ceiling · common: the shared landing
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "FloorKind".
 */
export type FloorKind = "parquet" | "gres" | "concrete" | "outdoor" | "common";
/**
 * Where along the walls: whole faces, or a stretch of one wall
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "WallTilingSpan".
 */
export type WallTilingSpan =
  | {
      kind: "walls";
      walls: string[];
    }
  | {
      kind: "stretch";
      wall: string;
      /**
       * @minItems 2
       * @maxItems 2
       */
      along: [From, To];
    };
export type From = number;
export type To = number;
/**
 * Up to a height (m above the floor), or the ceiling, wherever the storey puts it
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "WallTilingTop".
 */
export type WallTilingTop =
  | {
      to: "height";
      height: number;
    }
  | {
      to: "ceiling";
    };
export type X1 = number;
export type Z = number;
export type From1 = number;
export type To1 = number;
/**
 * How a leaf opens
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "LeafOperation".
 */
export type LeafOperation =
  "side-hung" | "tilt-turn" | "fixed" | "sliding" | "lift-slide" | "hung" | "bottom-hung" | "pivot" | "folding";
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "FrameMaterial".
 */
export type FrameMaterial = "wood" | "pvc" | "aluminium" | "wood-aluminium" | "steel";
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Glazing".
 */
export type Glazing = "double" | "triple" | "frosted" | "reflective" | "safety";
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "SillMaterial".
 */
export type SillMaterial = "wood" | "marble" | "stone" | "metal";
/**
 * The layers that shade an opening: outside the glass, then inside it
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "ShadingKind".
 */
export type ShadingKind =
  | "roller-shutter"
  | "hinged-shutters"
  | "sliding-shutters"
  | "interior-shutters"
  | "external-venetian"
  | "insect-screen"
  | "venetian"
  | "roller-blind"
  | "pleated"
  | "roman"
  | "curtain";
export type From2 = number;
export type To2 = number;
/**
 * @minItems 4
 * @maxItems 4
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Rect".
 */
export type Rect = [X0, Y0, X11, Y1];
export type X0 = number;
export type Y0 = number;
export type X11 = number;
export type Y1 = number;
/**
 * A light fixture, tied to the house entity that drives it
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "LightFixture".
 */
export type LightFixture =
  | {
      /**
       * a bare bulb on a cable from the ceiling
       */
      kind: "bulbPendant";
      at: Pt;
      /**
       * from the ceiling to the bulb, m
       */
      drop: number;
      /**
       * the bulb's light, candelas
       */
      cd: number;
      id: string;
      /**
       * the device that drives it (a Home Assistant entity or a KNX bridge id); absent until it is bound
       */
      entity?: string;
      source?: string;
    }
  | {
      kind: "barPendant";
      at: Pt;
      id: string;
      /**
       * the device that drives it (a Home Assistant entity or a KNX bridge id); absent until it is bound
       */
      entity?: string;
      source?: string;
    }
  | {
      kind: "sputnik";
      at: Pt;
      id: string;
      /**
       * the device that drives it (a Home Assistant entity or a KNX bridge id); absent until it is bound
       */
      entity?: string;
      source?: string;
    }
  | {
      kind: "squareCeiling";
      at: Pt;
      id: string;
      /**
       * the device that drives it (a Home Assistant entity or a KNX bridge id); absent until it is bound
       */
      entity?: string;
      source?: string;
    }
  | {
      /**
       * an LED strip from `a` to `b`, at any angle
       */
      kind: "ledStrip";
      a: Pt;
      b: Pt;
      /**
       * measured from the floor, or down from the ceiling
       */
      height: {
        from: "floor" | "ceiling";
        distance: number;
      };
      /**
       * where it shines: up, down, or to the left or right of a → b (y down)
       */
      facing: "down" | "up" | "left" | "right";
      /**
       * at full level
       */
      intensity: number;
      id: string;
      /**
       * the device that drives it (a Home Assistant entity or a KNX bridge id); absent until it is bound
       */
      entity?: string;
      source?: string;
    };
/**
 * A plate on a wall's face (redesign.md §7): a light switch's or a socket's
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Plate".
 */
export type Plate =
  | {
      kind: "switch";
      type: SwitchType;
      /**
       * what it drives, for the host apps (a Home Assistant entity or a KNX bridge id); absent: not said
       */
      entity?: string;
      id: string;
      wall: string;
      /**
       * the face it is on, walking the wall a → b (y down): the room it faces is that side's
       */
      side: "left" | "right";
      /**
       * where its centre is along the wall's centre line, sheet units from the wall's end `a`
       */
      along: number;
      /**
       * m, from the finished floor to its centre; absent: the house's for its kind (`settings.plates`)
       */
      height?: number;
      modules: PlateModules;
      /**
       * its series and colour as the author writes them ("BTicino Living Now · bianco"); a catalog product later
       */
      series?: string;
      source?: string;
    }
  | {
      kind: "socket";
      type: SocketType;
      id: string;
      wall: string;
      /**
       * the face it is on, walking the wall a → b (y down): the room it faces is that side's
       */
      side: "left" | "right";
      /**
       * where its centre is along the wall's centre line, sheet units from the wall's end `a`
       */
      along: number;
      /**
       * m, from the finished floor to its centre; absent: the house's for its kind (`settings.plates`)
       */
      height?: number;
      modules: PlateModules;
      /**
       * its series and colour as the author writes them ("BTicino Living Now · bianco"); a catalog product later
       */
      series?: string;
      source?: string;
    };
/**
 * A light switch's plate: a simple switch, a two-way one, a push button, a shutter's up and down
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "SwitchType".
 */
export type SwitchType = "switch" | "two-way" | "push-button" | "shutter";
/**
 * How many module places a plate has
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "PlateModules".
 */
export type PlateModules = 3 | 4 | 7;
/**
 * A socket's plate: the Italian 10/16 A one, a Schuko, USB, the aerial's, a data network's
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "SocketType".
 */
export type SocketType = "standard" | "schuko" | "usb" | "tv" | "data";
/**
 * A stair climbing from its plan's level to another: of runs, or a spiral
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Stair".
 */
export type Stair = RunStair | SpiralStair;
/**
 * What guards a side of a stair, or its opening above: a slim railing, a low wall, nothing
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "StairGuard".
 */
export type StairGuard = "railing" | "wall" | "none";
/**
 * on the sheet
 *
 * @minItems 2
 * @maxItems 2
 */
export type Pt2 = [X, Y];
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Annotation".
 */
export type Annotation = DimensionAnnotation | NoteAnnotation;
/**
 * One end of a dimension
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "DimensionEnd".
 */
export type DimensionEnd =
  | {
      kind: "point";
      at: Pt;
    }
  | {
      kind: "face";
      wall: string;
      side: "left" | "right";
    };
/**
 * a point of the sheet the dimension line runs through: where it is drawn, not what it measures
 *
 * @minItems 2
 * @maxItems 2
 */
export type Pt3 = [X, Y];
/**
 * where it is pinned on the sheet
 *
 * @minItems 2
 * @maxItems 2
 */
export type Pt4 = [X, Y];
export type X2 = number;
export type Z1 = number;
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "OpeningKind".
 */
export type OpeningKind = "door" | "window" | "french" | "passage";
/**
 * What every piece of a laying shows: an image uploaded (its file by sha256), a sample, or a plain colour
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "LayingMaterial".
 */
export type LayingMaterial =
  | {
      image: string;
    }
  | {
      sample: MaterialSample;
    }
  | {
      color: string;
    };
/**
 * The photos of materials Blupinta offers to lay pieces of, named by how they look: each a CC0 texture of Poly Haven's (`apps/web/public/floor-samples`, where each comes from is said there)
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "MaterialSample".
 */
export type MaterialSample = "oak" | "white-oak" | "bleached-oak" | "grey-wood" | "marble" | "cement";
/**
 * How a laying's pieces are set out (`laying.ts`)
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "LayingPattern".
 */
export type LayingPattern = "straight" | "half" | "third" | "herringbone" | "chevron" | "basket" | "hexagons";
export type Length = number;
export type Width = number;
export type Length1 = number;
export type Width1 = number;
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "HouseKind".
 */
export type HouseKind = "flat" | "detached" | "terraced";
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Mount".
 */
export type Mount = "floor" | "wall" | "ceiling" | "surface" | "built-in";
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "OptionSpec".
 */
export type OptionSpec =
  ChoiceOption | MaterialOption | NumberOption | ToggleOption | ImageOption | SlotsOption | TextOption;
/**
 * A rule between options (furnishing.md §3, a modular system): a value is offered only while every condition holds (BESTÅ's 180 frame only in white)
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "AllowedIf".
 */
export type AllowedIf = Condition[];
/**
 * A value a variant names for an option: a choice's or material's id, a number, yes or no, each slot's choice
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "VariantValue".
 */
export type VariantValue = string | number | boolean | (string | null)[];
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "GeometrySource".
 */
export type GeometrySource =
  | {
      kind: "builtin";
      generator: string;
    }
  | {
      kind: "envelope";
      material?: string;
    }
  | {
      kind: "gltf";
      models: ModelChoice[];
      materialVariant?: string;
    }
  | {
      kind: "recipe";
      parts: RecipePart[];
    };
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "RecipePart".
 */
export type RecipePart =
  | {
      shape: "box" | "cylinder";
      size: Triple;
      material: MaterialRef;
      at: Triple1;
      /**
       * how many, an expression; 0 leaves it out (an option switching a part off)
       */
      count?: string;
      /**
       * one copy per slot of this slots option (`count` of them in each, then): in the part's `when` and its models', the option names this slot's own value; `index` names the slot's position
       */
      slots?: string;
      /**
       * in a part made per slot with a count, the name each copy's number within its slot goes by
       */
      copy?: string;
      when?: When1;
      /**
       * the name each copy's number (0, 1, …) goes by in the part's expressions
       */
      index?: string;
      /**
       * what the part is ("drawer 1"), for clearances and, later, animation
       */
      name?: string;
    }
  | {
      shape: "model";
      models: ModelChoice[];
      at: Triple2;
      /**
       * how many, an expression; 0 leaves it out (an option switching a part off)
       */
      count?: string;
      /**
       * one copy per slot of this slots option (`count` of them in each, then): in the part's `when` and its models', the option names this slot's own value; `index` names the slot's position
       */
      slots?: string;
      /**
       * in a part made per slot with a count, the name each copy's number within its slot goes by
       */
      copy?: string;
      when?: When2;
      /**
       * the name each copy's number (0, 1, …) goes by in the part's expressions
       */
      index?: string;
      /**
       * what the part is ("drawer 1"), for clearances and, later, animation
       */
      name?: string;
    };
/**
 * Three expressions of the options, m: x, y, z or w, h, d
 *
 * @minItems 3
 * @maxItems 3
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Triple".
 */
export type Triple = [string, string, string];
/**
 * A part's finish: what a material option holds, or a material of the library
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "MaterialRef".
 */
export type MaterialRef =
  | {
      option: string;
    }
  | {
      material: string;
    };
/**
 * Three expressions of the options, m: x, y, z or w, h, d
 *
 * @minItems 3
 * @maxItems 3
 */
export type Triple1 = [string, string, string];
/**
 * Three expressions of the options, m: x, y, z or w, h, d
 *
 * @minItems 3
 * @maxItems 3
 */
export type Triple2 = [string, string, string];
/**
 * What a clearance is kept free for, named in the editor's warnings
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "ClearanceUse".
 */
export type ClearanceUse = "drawers" | "doors" | "seat" | "access" | "appliance";
/**
 * One option's value: a choice's or material's id, a number, yes or no, each slot's choice, a picture, a text
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "OptionValue".
 */
export type OptionValue = string | number | boolean | (string | null)[] | ImageValue | null;
export type X3 = number;
export type Y2 = number;
export type W = number;
export type H = number;
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "ItemPlacement".
 */
export type ItemPlacement =
  | {
      kind: "floor";
      plan: string;
      at: Pt;
      rotation: number;
    }
  | {
      kind: "wall";
      plan: string;
      wall: string;
      side: "left" | "right";
      along: number;
      y0: number;
      gap: number;
    }
  | {
      kind: "ceiling";
      plan: string;
      at: Pt;
      rotation: number;
      drop: number;
    }
  | {
      kind: "on";
      parent: string;
      /**
       * @minItems 2
       * @maxItems 2
       */
      offset: [X4, Z2];
      rotation: number;
    };
export type X4 = number;
export type Z2 = number;
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "SetPlacement".
 */
export type SetPlacement =
  | {
      kind: "floor";
      /**
       * @minItems 2
       * @maxItems 2
       */
      at: [X5, Y3];
      rotation: number;
    }
  | {
      kind: "ceiling";
      /**
       * @minItems 2
       * @maxItems 2
       */
      at: [X6, Y4];
      rotation: number;
      drop: number;
    }
  | {
      kind: "on";
      parent: number;
      /**
       * @minItems 2
       * @maxItems 2
       */
      offset: [X7, Z3];
      rotation: number;
    };
export type X5 = number;
export type Y3 = number;
export type X6 = number;
export type Y4 = number;
export type X7 = number;
export type Z3 = number;
/**
 * How a drawing was put to scale: on a known length between two of its points (`metres`), or by the scale written on it (1:`ratio`) and the dpi it was scanned at. A better scan laid over it keeps it.
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "ImageScaling".
 */
export type ImageScaling =
  | {
      kind: "measure";
      metres: number;
    }
  | {
      kind: "written";
      ratio: number;
      dpi: number;
    };
/**
 * What a room is for, as the electrical norm's table names them (CEI 64-8, part 3, annex A)
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "RoomUse".
 */
export type RoomUse =
  | "living"
  | "bedroom"
  | "study"
  | "kitchen"
  | "kitchenette"
  | "bathroom"
  | "wc"
  | "laundry"
  | "hallway"
  | "entrance"
  | "storage"
  | "balcony"
  | "cellar"
  | "garage"
  | "other";
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "NoteColour".
 */
export type NoteColour = "yellow" | "coral" | "green" | "blue" | "violet";

export interface HomeModel {
  /**
   * version of this shape: a file of another version is migrated by a script, never guessed
   */
  schema: 6;
  id: string;
  name: string;
  /**
   * where it is, as its author writes it
   */
  address?: string;
  site: Site;
  sheets: Sheet[];
  levels: Level[];
  areas: Area[];
  plans: Plan[];
  /**
   * the first one is shown when nothing else is chosen
   */
  presentations: Presentation[];
  /**
   * the house's kinds of windows and doors, defined once and placed already configured (§8b)
   */
  openingTypes?: OpeningType[];
  /**
   * floors made by the person (redesign.md §8): this home's own, and a copy of each of their kits it uses
   */
  floors?: FloorDefinition[];
  /**
   * wall tiles made by the person (redesign.md §8f): this home's own, and a copy of each of their kits it uses
   */
  wallTiles?: WallTileDefinition[];
  settings?: HouseSettings;
  setup?: HomeSetup;
  /**
   * the project's copy of every catalog product its items use (furnishing.md §6, stage 2): the home renders whatever happens to the catalog
   */
  products?: ProductManifest[];
  /**
   * everything in the house from the catalog, placed or not (furnishing.md §4–5)
   */
  inventory?: InventoryItem[];
  /**
   * pieces selected and moved as one (furnishing.md §8)
   */
  groups?: PieceGroup[];
  /**
   * groups of pieces saved to be placed again (furnishing.md §2)
   */
  sets?: PieceSet[];
}
/**
 * Where the home stands: drives the sun's path
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Site".
 */
export interface Site {
  lat: number;
  lng: number;
  /**
   * degrees clockwise from the sheets' "up" to true north (0 = drawn north up)
   */
  north: number;
  source?: string;
}
/**
 * A drawing's frame of coordinates and its scale; it knows nothing about floors
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Sheet".
 */
export interface Sheet {
  id: string;
  /**
   * sheet units per metre: 100 for new sheets (units are cm)
   */
  pxPerM: number;
  image?: SheetImage;
  /**
   * scale written on the drawing, e.g. "1:200"
   */
  scale?: string;
  source?: string;
}
/**
 * the drawing laid on the sheet; absent for a plan drawn from measurements only
 */
export interface SheetImage {
  /**
   * the file, by its name in the project
   */
  src: string;
  /**
   * size in image pixels
   */
  width: number;
  height: number;
  /**
   * where the image lies on the sheet: its top-left corner at `at`, `scale` sheet units per image pixel, turned by `rotation` degrees clockwise about `at`. Calibrating or straightening moves the image, never the walls.
   */
  place: {
    at: Pt;
    scale: number;
    rotation: number;
  };
  crop?: ImageCrop;
  /**
   * how the drawing was put to scale, so what is traced on it measures true; absent: never, it lies at the size it was imported at (a guess) and the editor says so
   */
  scaledBy?:
    | {
        kind: "measure";
        metres: number;
      }
    | {
        kind: "written";
        ratio: number;
        dpi: number;
      };
}
/**
 * the part of the image shown, in image pixels; the whole image when absent
 */
export interface ImageCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Level".
 */
export interface Level {
  id: string;
  name: string;
  /**
   * as a lift's button says it ("3", "-1"); `name` when absent
   */
  shortName?: string;
  /**
   * height of its floor above the ground, m
   */
  elevation: number;
  source?: string;
}
/**
 * A group of rooms, independent of levels and sheets
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Area".
 */
export interface Area {
  id: string;
  name: string;
  kind: "dwelling" | "garage" | "cellar" | "outdoor" | "zone";
}
/**
 * A region of a sheet laid on a level, with everything drawn on it
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Plan".
 */
export interface Plan {
  id: string;
  sheet: string;
  level: string;
  origin: Pt1;
  /**
   * real position in the site; null = detached (only an arranged presentation places it)
   */
  placement: Placement | null;
  heights: PlanHeights;
  /**
   * in the order the house is gone through
   */
  rooms: Room[];
  walls: Wall[];
  awnings: Awning[];
  /**
   * wall claddings, always shown
   */
  finishes: Item[];
  /**
   * simple furniture blocks
   */
  items: Item[];
  lights: LightFixture[];
  /**
   * the light switches' and sockets' plates on its walls (redesign.md §7)
   */
  plates: Plate[];
  /**
   * the stairs that start on this plan (floor-plan-editor.md §8d)
   */
  stairs?: Stair[];
  /**
   * dimension lines and notes for people: printed, ignored by the renderer
   */
  annotations?: Annotation[];
  source?: string;
}
/**
 * Where a plan really is: its origin in site metres, and how far it is turned
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Placement".
 */
export interface Placement {
  x: number;
  z: number;
  /**
   * degrees, clockwise as seen from above
   */
  rotation: number;
}
/**
 * Heights of a plan, m
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "PlanHeights".
 */
export interface PlanHeights {
  ceiling: number;
  /**
   * outdoor floors (balconies, landing) sit this far from the indoor ones
   */
  outdoorFloor: number;
  /**
   * balcony slab under the outdoor floor
   */
  balconySlab: number;
  /**
   * the floor's structure from this plan's ceiling to the floor of the level above; absent, a typical 30 cm
   */
  slab?: number;
  source?: string;
  sources?: MeasureSources3C22Ceiling227C22OutdoorFloor227C22Slab223E;
}
/**
 * Where each of some measures comes from, by the measure's name; one not listed says nothing
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "MeasureSources<("ceiling"|"outdoorFloor"|"slab")>".
 */
export interface MeasureSources3C22Ceiling227C22OutdoorFloor227C22Slab223E {
  ceiling?: MeasureSource;
  outdoorFloor?: MeasureSource;
  slab?: MeasureSource;
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Room".
 */
export interface Room {
  id: RoomId;
  area: string;
  name: string;
  /**
   * where space is tight; `name` when absent
   */
  shortName?: string;
  /**
   * designation written on the cadastral plan
   */
  cadastral?: string;
  shape: RoomShape;
  /**
   * what the room is for: the electrical norm's minimum sockets go by it (CEI 64-8); absent, not said yet
   */
  use?:
    | "living"
    | "bedroom"
    | "study"
    | "kitchen"
    | "kitchenette"
    | "bathroom"
    | "wc"
    | "laundry"
    | "hallway"
    | "entrance"
    | "storage"
    | "balcony"
    | "cellar"
    | "garage"
    | "other";
  /**
   * a kind of floor, or one of the home's own floors by id (`floors`); absent: no floor chosen yet (the editor tells such rooms apart by a hue of their own, redesign.md R9)
   */
  floor?: FloorKind | FloorRef;
  /**
   * the direction its strips run, degrees from the sheet's x (0 = east–west, 90 = north–south): a parquet's, and added to a floor of the home's own direction
   */
  floorAngle?: number;
  paint?: RoomPaint;
  /**
   * its walls' tiled areas (redesign.md §8f), over the paint
   */
  wallTiling?: WallTiling[];
  /**
   * the ways of looking at the room from above, the first being the overview it opens with
   */
  views: RoomView[];
  source?: string;
}
/**
 * The region the plan's walls (separators and railings included) enclose around `at`
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "RoomShape".
 */
export interface RoomShape {
  kind: "region";
  at: Pt;
}
/**
 * One of the home's own floors, by its id (`HomeModel.floors`)
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "FloorRef".
 */
export interface FloorRef {
  floor: string;
}
/**
 * painted walls; every other wall is white
 */
export interface RoomPaint {
  color: string;
  walls: string[];
  source?: string;
}
/**
 * An area of a room's walls laid with tiles, on their faces towards the room (redesign.md §8f), from `bottom` up to `top`: a bathroom's walls to 1.20 m, a shower's to 2.10 m, a kitchen's splashback between the worktop and the wall units
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "WallTiling".
 */
export interface WallTiling {
  id: string;
  /**
   * the home's wall tiles laid (`wallTiles`)
   */
  tiles: string;
  on: WallTilingSpan;
  /**
   * m above the floor
   */
  bottom: number;
  top: WallTilingTop;
  source?: string;
}
/**
 * One way of looking at a room: `dir` is the horizontal direction from the room towards the camera (x east, z south); `lower` the walls lowered so they don't hide the room.
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "RoomView".
 */
export interface RoomView {
  id: string;
  name: string;
  /**
   * @minItems 2
   * @maxItems 2
   */
  dir: [X1, Z];
  /**
   * wall ids
   */
  lower: string[];
  /**
   * degrees above the horizon; the camera's default when absent
   */
  elevation?: number;
}
/**
 * A wall: its centre line from `a` to `b`, straight or an arc. A railing's line is the outer edge of the slab it stands on (its kerb lies inside it); a separator has no body, it only divides two rooms of one open space.
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Wall".
 */
export interface Wall {
  id: string;
  a: Pt;
  b: Pt;
  /**
   * sheet units; how far the middle of the line bulges to the left of a → b (y down); 0 or absent: straight
   */
  sagitta?: number;
  /**
   * m; 0 for a separator
   */
  thickness: number;
  /**
   * m; full storey height when absent
   */
  height?: number;
  kind: "wall" | "parapet" | "railing" | "separator";
  openings: Opening[];
  source?: string;
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Opening".
 */
export interface Opening {
  id: string;
  /**
   * a passage is a doorway with no frame and no leaf
   */
  kind: "door" | "window" | "french" | "passage";
  /**
   * where it runs along its wall's centre line, sheet units from the wall's end `a`
   *
   * @minItems 2
   * @maxItems 2
   */
  along: [From1, To1];
  /**
   * m above the floor
   */
  sill: number;
  top: number;
  /**
   * number of sashes (default: 2 if wider than 90 cm)
   */
  leaves?: number;
  /**
   * shutter entity in the KNX bridge
   */
  knx?: string;
  /**
   * the house's opening type it is (`openingTypes`); its leaves, frame, glazing, sills and shading come from it
   */
  type?: string;
  /**
   * which side of its wall is its inside, walking the wall a → b; worked out from the rooms when absent (the side with an indoor room)
   */
  inside?: "left" | "right";
  /**
   * what this opening has of its own, over its type's (or over its kind's defaults when it has none)
   */
  overrides?: {
    leaves?: Leaf[];
    frame?: {
      material: FrameMaterial;
      colorInside: string;
      colorOutside: string;
      /**
       * where the frame sits in the wall's thickness
       */
      position: "inner" | "middle" | "outer";
    };
    glazing?: Glazing;
    sills?: {
      inner: {
        material: SillMaterial;
        overhang: number;
      } | null;
      outer: {
        material: SillMaterial;
      } | null;
    };
    shading?: ShadingLayer[];
  };
  source?: string;
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Leaf".
 */
export interface Leaf {
  operation: LeafOperation;
  /**
   * the side its hinges are on, seen from inside
   */
  hinge: "left" | "right";
  /**
   * into the room (in) or out of it
   */
  opens: "in" | "out";
  /**
   * its share of the opening's width, 0–1; leaves without one share what is left equally
   */
  share?: number;
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "ShadingLayer".
 */
export interface ShadingLayer {
  kind: ShadingKind;
  /**
   * a roller shutter's box: in the room, on the façade, or hidden in the wall
   */
  box?: "inside" | "outside" | "hidden";
  drive?: "manual" | "strap" | "motor";
  /**
   * shutters' panels (hinged or sliding ones only): slatted, or solid wood (Italian "persiane" and "scuri")
   */
  panels?: "louvred" | "solid";
}
/**
 * A motorised sun awning, hanging on a wall's face
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Awning".
 */
export interface Awning {
  id: string;
  /**
   * cover entity in the KNX bridge; absent until it is bound
   */
  knx?: string;
  wall: string;
  /**
   * which face it hangs on, walking the wall a → b (y down)
   */
  side: "left" | "right";
  /**
   * its width along the wall, sheet units from the wall's end `a`; it may reach past the wall's ends
   *
   * @minItems 2
   * @maxItems 2
   */
  along: [From2, To2];
  /**
   * m, from the wall's face to the outer edge
   */
  depth: number;
  /**
   * m above the floor, at the wall and at the outer edge
   */
  hWall: number;
  hOut: number;
  source?: string;
}
/**
 * A plain block: a cladding or a piece of furniture not yet a catalog product
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Item".
 */
export interface Item {
  id: string;
  rect: Rect;
  /**
   * m
   */
  h: number;
  /**
   * m above the floor
   */
  y0?: number;
  /**
   * degrees, clockwise about the rectangle's centre
   */
  rotation?: number;
  color: string;
  glow?: boolean;
  glass?: boolean;
  texture?: "brick";
  source?: string;
}
/**
 * A stair of runs (§8d): its shape is its walking line, 2 points straight, 3 an L, 4 a U, its turns square
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "RunStair".
 */
export interface RunStair {
  /**
   * the walking line on the sheet, from the first riser to the last, in the direction it climbs
   */
  path: Pt[];
  /**
   * m
   */
  width: number;
  /**
   * what fills each turn: a landing, or winders (three steps a quarter turn)
   */
  turn: "landing" | "winders";
  id: string;
  /**
   * the level it climbs to
   */
  to: string;
  /**
   * how many risers; absent, as few as keep each one under 18 cm of the height it climbs
   */
  risers?: number;
  guards?: StairGuards;
  source?: string;
}
/**
 * A stair's guards; a side not said is worked out (a railing where it is not against a wall)
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "StairGuards".
 */
export interface StairGuards {
  /**
   * as one climbs
   */
  left?: "railing" | "wall" | "none";
  right?: StairGuard;
  /**
   * What guards a side of a stair, or its opening above: a slim railing, a low wall, nothing
   */
  opening?: "railing" | "wall" | "none";
}
/**
 * A spiral stair round its column (§8d)
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "SpiralStair".
 */
export interface SpiralStair {
  spiral: {
    centre: Pt2;
    /**
     * to the outside of its treads, m
     */
    radius: number;
    /**
     * the column's radius, m
     */
    column: number;
    /**
     * where the first riser is, degrees from east, clockwise on the sheet
     */
    start: number;
    /**
     * how far round it climbs, degrees, + clockwise on the sheet; a whole turn at most
     */
    sweep: number;
  };
  id: string;
  /**
   * the level it climbs to
   */
  to: string;
  /**
   * how many risers; absent, as few as keep each one under 18 cm of the height it climbs
   */
  risers?: number;
  guards?: StairGuards;
  source?: string;
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "DimensionAnnotation".
 */
export interface DimensionAnnotation {
  id: string;
  kind: "dimension";
  from: DimensionEnd;
  to: DimensionEnd;
  at: Pt3;
  /**
   * taken on site: what the tape said, m, and the day (YYYY-MM-DD); the plan must keep agreeing with it
   */
  measured?: {
    metres: number;
    date: string;
  };
  source?: string;
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "NoteAnnotation".
 */
export interface NoteAnnotation {
  id: string;
  kind: "note";
  at: Pt4;
  text: string;
  /**
   * absent: `yellow`
   */
  colour?: "yellow" | "coral" | "green" | "blue" | "violet";
}
/**
 * Which areas are shown together, and where
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Presentation".
 */
export interface Presentation {
  id: string;
  name: string;
  /**
   * true: every plan at its real placement; arranged: each area moved by its own offset
   */
  mode: "true" | "arranged";
  areas: PresentedArea[];
  walk?: WalkStart;
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "PresentedArea".
 */
export interface PresentedArea {
  area: string;
  /**
   * arranged only: how far the area's plans move from their placement, m
   *
   * @minItems 2
   * @maxItems 2
   */
  offset?: [X2, Z1];
}
/**
 * Standing at `from`, looking towards `towards`: sheet units of `plan`
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "WalkStart".
 */
export interface WalkStart {
  plan: string;
  from: Pt;
  towards: Pt;
}
/**
 * One of the house's kinds of windows or doors: placed already configured, its size the starting one
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "OpeningType".
 */
export interface OpeningType {
  leaves: Leaf[];
  frame: {
    material: FrameMaterial;
    colorInside: string;
    colorOutside: string;
    /**
     * where the frame sits in the wall's thickness
     */
    position: "inner" | "middle" | "outer";
  };
  glazing: Glazing;
  sills: {
    inner: {
      material: SillMaterial;
      overhang: number;
    } | null;
    outer: {
      material: SillMaterial;
    } | null;
  };
  shading: ShadingLayer[];
  id: string;
  /**
   * the author's name for it ("Finestra standard")
   */
  name: string;
  kind: OpeningKind;
  /**
   * m
   */
  width: number;
  sill: number;
  top: number;
  source?: string;
}
/**
 * A floor made by the person (redesign.md §8, R13): its laying and what kind of floor it is. Kept in the home (only this home's, or the copy of one of the author's kits, with the kit's id and the version copied)
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "FloorDefinition".
 */
export interface FloorDefinition {
  id: string;
  /**
   * the author's name for it ("Rovere a spina")
   */
  name: string;
  /**
   * parquet, gres, concrete: indoor · outdoor: balconies, a step down, no ceiling · common: the shared landing
   */
  kind: "parquet" | "gres" | "concrete" | "outdoor" | "common";
  /**
   * a copy of one of the author's kits: its id and the version copied (a newer one is proposed, never imposed)
   */
  kit?: {
    id: string;
    version: number;
  };
  source?: string;
  material: LayingMaterial;
  pattern: LayingPattern;
  /**
   * m: a piece's length and width; a hexagon is as wide across its flats as both (the parser asks them equal)
   *
   * @minItems 2
   * @maxItems 2
   */
  tile: [Length, Width];
  joint: {
    /**
     * m
     */
    width: number;
    color: string;
  };
  /**
   * degrees, the pieces' length turned from the region's x (a floor: the sheet's; a wall: along it)
   */
  direction: 0 | 45 | 90;
  /**
   * how much one piece's shade may differ from the next, 0–0.5
   */
  variation: number;
  finish: "matte" | "satin" | "gloss";
  /**
   * the product it is, as the author writes it ("Marazzi Treverk 10×60"); a catalog product later
   */
  product?: string;
}
/**
 * Wall tiles made by the person (redesign.md §8f): their laying, as a floor's but with no kind. Kept in the home as floors are (only this home's, or the copy of one of the author's kits)
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "WallTileDefinition".
 */
export interface WallTileDefinition {
  id: string;
  /**
   * the author's name for them ("Bianco lucido 10×20")
   */
  name: string;
  /**
   * a copy of one of the author's kits: its id and the version copied (a newer one is proposed, never imposed)
   */
  kit?: {
    id: string;
    version: number;
  };
  source?: string;
  material: LayingMaterial;
  pattern: LayingPattern;
  /**
   * m: a piece's length and width; a hexagon is as wide across its flats as both (the parser asks them equal)
   *
   * @minItems 2
   * @maxItems 2
   */
  tile: [Length1, Width1];
  joint: {
    /**
     * m
     */
    width: number;
    color: string;
  };
  /**
   * degrees, the pieces' length turned from the region's x (a floor: the sheet's; a wall: along it)
   */
  direction: 0 | 45 | 90;
  /**
   * how much one piece's shade may differ from the next, 0–0.5
   */
  variation: number;
  finish: "matte" | "satin" | "gloss";
  /**
   * the product it is, as the author writes it ("Marazzi Treverk 10×60"); a catalog product later
   */
  product?: string;
}
/**
 * what the house's author set once and the tools start from (§8c)
 */
export interface HouseSettings {
  kind?: HouseKind;
  /**
   * How a house was built, for the measures typical of it (`houseDefaults.ts` `ERA_MEASURES`, their sources in floor-plan-editor.md §8c)
   */
  era?: "1960s-1980s" | "recent" | "class-a";
  /**
   * m: the thickness new outer and inner walls start with
   */
  walls?: {
    outer: number;
    inner: number;
    sources?: MeasureSources3C22Outer227C22Inner223E;
  };
  /**
   * parquet, gres, concrete: indoor · outdoor: balconies, a step down, no ceiling · common: the shared landing
   */
  roomFloor?: "parquet" | "gres" | "concrete" | "outdoor" | "common";
  /**
   * the house's type (one of `openingTypes`, of that kind) each opening tool starts with
   */
  toolTypes?: {
    door?: string;
    window?: string;
    french?: string;
  };
  /**
   * m, from the finished floor to a plate's centre: where new light switches and sockets go (`housePlates`)
   */
  plates?: {
    switchHeight: number;
    socketHeight: number;
    sources?: MeasureSources3C22SwitchHeight227C22SocketHeight223E;
  };
}
/**
 * Where each of some measures comes from, by the measure's name; one not listed says nothing
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "MeasureSources<("outer"|"inner")>".
 */
export interface MeasureSources3C22Outer227C22Inner223E {
  outer?: MeasureSource;
  inner?: MeasureSource;
}
/**
 * Where each of some measures comes from, by the measure's name; one not listed says nothing
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "MeasureSources<("switchHeight"|"socketHeight")>".
 */
export interface MeasureSources3C22SwitchHeight227C22SocketHeight223E {
  switchHeight?: MeasureSource;
  socketHeight?: MeasureSource;
}
/**
 * the new home's guided setup; absent for a home that never had one
 */
export interface HomeSetup {
  /**
   * the guided setup was gone through (or skipped to its end): it no longer opens by itself
   */
  isFinished: boolean;
  /**
   * the checklist of next steps put away; it is shown again from the house's settings
   */
  isChecklistHidden?: boolean;
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "ProductManifest".
 */
export interface ProductManifest {
  /**
   * namespace/name, stable forever ("ikea/kallax", "jal/handmade-drawers")
   */
  id: string;
  /**
   * bumped on any change that can move or reshape an item
   */
  version: number;
  brand?: string;
  name: Translated;
  description?: Translated;
  /**
   * a path in the shared taxonomy: "storage/shelving", "lighting/pendant", "decor/wall-art"
   */
  category: string;
  tags: string[];
  mount: Mount;
  options: OptionSpec[];
  /**
   * option combinations the maker sells under its own article number (a slots option's as its slots' choices)
   */
  variants?: {
    options: {
      [k: string]: VariantValue;
    };
    article: string;
  }[];
  geometry: GeometrySource;
  /**
   * width (x), height (y), depth (z) as expressions of the options, m
   */
  size: {
    w: string;
    h: string;
    d: string;
  };
  /**
   * the space it needs in use, beside its sides (furnishing.md §8): drawers pulled out, a door's swing, a chair
   */
  clearances?: Clearance[];
  /**
   * what in it a house entity can drive
   */
  bindings?: {
    slot: string;
    kind: "light" | "media" | "cover" | "appliance" | "sensor";
  }[];
  media?: {
    thumbnails: string[];
  };
  /**
   * the product sheet or the measurement it comes from
   */
  source: string;
  links?: {
    url: string;
    kind: "product" | "manual" | "shop";
  }[];
}
/**
 * App content, shared by every user: in each of the app's languages (furnishing.md F5)
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Translated".
 */
export interface Translated {
  it: string;
  en: string;
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "ChoiceOption".
 */
export interface ChoiceOption {
  kind: "choice";
  /**
   * each with numbers the expressions read as `<option>.<name>` (KALLAX's `size.cols`)
   */
  choices: {
    id: string;
    name: Translated;
    params?: {
      [k: string]: number;
    };
    allowedIf?: AllowedIf;
  }[];
  default: string;
  id: string;
  name: Translated;
  visibleIf?: Condition;
}
/**
 * Shows (or allows) an option only when another holds one of some values
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Condition".
 */
export interface Condition {
  option: string;
  in: (string | number | boolean)[];
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "MaterialOption".
 */
export interface MaterialOption {
  kind: "material";
  /**
   * the library's materials it is sold in
   */
  materials: string[];
  /**
   * the materials sold only with some other values, by material
   */
  allowedIf?: {
    [k: string]: AllowedIf;
  };
  default: string;
  id: string;
  name: Translated;
  visibleIf?: Condition;
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "NumberOption".
 */
export interface NumberOption {
  kind: "number";
  min: number;
  max: number;
  step: number;
  unit: "m" | "count" | "degrees";
  default: number;
  id: string;
  name: Translated;
  visibleIf?: Condition;
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "ToggleOption".
 */
export interface ToggleOption {
  kind: "toggle";
  default: boolean;
  id: string;
  name: Translated;
  visibleIf?: Condition;
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "ImageOption".
 */
export interface ImageOption {
  kind: "image";
  /**
   * width over height of the picture's place
   */
  aspect: number;
  /**
   * a picture cut across panels (a multi-panel canvas), with the gap between them, m
   */
  panels?: number;
  gap?: number;
  id: string;
  name: Translated;
  visibleIf?: Condition;
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "SlotsOption".
 */
export interface SlotsOption {
  kind: "slots";
  /**
   * how many slots, as an expression of the other options (KALLAX's cells)
   */
  count: string;
  choices: {
    id: string;
    name: Translated;
    allowedIf?: AllowedIf;
  }[];
  id: string;
  name: Translated;
  visibleIf?: Condition;
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "TextOption".
 */
export interface TextOption {
  kind: "text";
  maxLength: number;
  default: string;
  id: string;
  name: Translated;
  visibleIf?: Condition;
}
/**
 * A model and the options that choose it; one without `when` is the fallback. A maker's component carries its article, and how many parts one article gives (STUBBARP's legs come two to a pack)
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "ModelChoice".
 */
export interface ModelChoice {
  when?: When;
  model: ModelRef;
  lod?: ModelRef;
  article?: string;
  perArticle?: number;
}
/**
 * Option values that must all hold: a choice's or a material's id, a number, yes or no; in a part made per slot, null for its slot left empty
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "When".
 */
export interface When {
  [k: string]: string | number | boolean | null;
}
/**
 * A model of the catalog: its bytes' sha256, and the file it is published from (`pnpm catalog:assets`)
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "ModelRef".
 */
export interface ModelRef {
  sha256: string;
  file: string;
}
/**
 * Option values that must all hold: a choice's or a material's id, a number, yes or no; in a part made per slot, null for its slot left empty
 */
export interface When1 {
  [k: string]: string | number | boolean | null;
}
/**
 * Option values that must all hold: a choice's or a material's id, a number, yes or no; in a part made per slot, null for its slot left empty
 */
export interface When2 {
  [k: string]: string | number | boolean | null;
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "Clearance".
 */
export interface Clearance {
  use: ClearanceUse;
  /**
   * the side it opens out of, as the product faces: across its whole width on the front or back, its depth on a side
   */
  side: "front" | "back" | "left" | "right";
  /**
   * how far out, m, as an expression of the options
   */
  depth: string;
  /**
   * where the measure comes from: the product sheet, a measurement, a usual allowance
   */
  source: string;
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "InventoryItem".
 */
export interface InventoryItem {
  id: string;
  /**
   * the product and the version it was placed with: a newer one is offered, never forced
   */
  product: {
    id: string;
    version: number;
  };
  options: OptionValues;
  /**
   * the author's own name for it ("Libreria studio"); the product's name when absent
   */
  label?: string;
  /**
   * the room it belongs to, placed or not
   */
  room?: string;
  /**
   * where it stands; null: in the inventory, not placed yet
   */
  placement: ItemPlacement | null;
  /**
   * a house entity driving one of the product's binding slots
   */
  bindings?: {
    [k: string]: string;
  };
  source?: string;
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "OptionValues".
 */
export interface OptionValues {
  [k: string]: OptionValue;
}
/**
 * A picture in an image option: a file of the project and the part of it shown (fractions of its size)
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "ImageValue".
 */
export interface ImageValue {
  file: string;
  /**
   * @minItems 4
   * @maxItems 4
   */
  crop: [X3, Y2, W, H];
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "PieceGroup".
 */
export interface PieceGroup {
  id: string;
  /**
   * the author's name for it ("Postazione"); none for a group only made to move things together
   */
  name?: string;
  /**
   * two or more pieces of the inventory
   */
  pieces: string[];
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "PieceSet".
 */
export interface PieceSet {
  id: string;
  name: string;
  pieces: SetPiece[];
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "SetPiece".
 */
export interface SetPiece {
  product: {
    id: string;
    version: number;
  };
  options: OptionValues;
  label?: string;
  placement: SetPlacement;
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "HomeModel".
 */
export interface HomeModel1 {
  /**
   * version of this shape: a file of another version is migrated by a script, never guessed
   */
  schema: 6;
  id: string;
  name: string;
  /**
   * where it is, as its author writes it
   */
  address?: string;
  site: Site;
  sheets: Sheet[];
  levels: Level[];
  areas: Area[];
  plans: Plan[];
  /**
   * the first one is shown when nothing else is chosen
   */
  presentations: Presentation[];
  /**
   * the house's kinds of windows and doors, defined once and placed already configured (§8b)
   */
  openingTypes?: OpeningType[];
  /**
   * floors made by the person (redesign.md §8): this home's own, and a copy of each of their kits it uses
   */
  floors?: FloorDefinition[];
  /**
   * wall tiles made by the person (redesign.md §8f): this home's own, and a copy of each of their kits it uses
   */
  wallTiles?: WallTileDefinition[];
  settings?: HouseSettings;
  setup?: HomeSetup;
  /**
   * the project's copy of every catalog product its items use (furnishing.md §6, stage 2): the home renders whatever happens to the catalog
   */
  products?: ProductManifest[];
  /**
   * everything in the house from the catalog, placed or not (furnishing.md §4–5)
   */
  inventory?: InventoryItem[];
  /**
   * pieces selected and moved as one (furnishing.md §8)
   */
  groups?: PieceGroup[];
  /**
   * groups of pieces saved to be placed again (furnishing.md §2)
   */
  sets?: PieceSet[];
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "SheetImage".
 */
export interface SheetImage1 {
  /**
   * the file, by its name in the project
   */
  src: string;
  /**
   * size in image pixels
   */
  width: number;
  height: number;
  /**
   * where the image lies on the sheet: its top-left corner at `at`, `scale` sheet units per image pixel, turned by `rotation` degrees clockwise about `at`. Calibrating or straightening moves the image, never the walls.
   */
  place: {
    at: Pt;
    scale: number;
    rotation: number;
  };
  crop?: ImageCrop;
  /**
   * how the drawing was put to scale, so what is traced on it measures true; absent: never, it lies at the size it was imported at (a guess) and the editor says so
   */
  scaledBy?:
    | {
        kind: "measure";
        metres: number;
      }
    | {
        kind: "written";
        ratio: number;
        dpi: number;
      };
}
/**
 * A rectangle of an image, in its pixels from its top-left corner
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "ImageCrop".
 */
export interface ImageCrop1 {
  x: number;
  y: number;
  width: number;
  height: number;
}
/**
 * The room's walls painted, each on its face towards this room (a wall shared by two rooms has two faces)
 *
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "RoomPaint".
 */
export interface RoomPaint1 {
  color: string;
  walls: string[];
  source?: string;
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "HouseSettings".
 */
export interface HouseSettings1 {
  kind?: HouseKind;
  /**
   * How a house was built, for the measures typical of it (`houseDefaults.ts` `ERA_MEASURES`, their sources in floor-plan-editor.md §8c)
   */
  era?: "1960s-1980s" | "recent" | "class-a";
  /**
   * m: the thickness new outer and inner walls start with
   */
  walls?: {
    outer: number;
    inner: number;
    sources?: MeasureSources3C22Outer227C22Inner223E;
  };
  /**
   * parquet, gres, concrete: indoor · outdoor: balconies, a step down, no ceiling · common: the shared landing
   */
  roomFloor?: "parquet" | "gres" | "concrete" | "outdoor" | "common";
  /**
   * the house's type (one of `openingTypes`, of that kind) each opening tool starts with
   */
  toolTypes?: {
    door?: string;
    window?: string;
    french?: string;
  };
  /**
   * m, from the finished floor to a plate's centre: where new light switches and sockets go (`housePlates`)
   */
  plates?: {
    switchHeight: number;
    socketHeight: number;
    sources?: MeasureSources3C22SwitchHeight227C22SocketHeight223E;
  };
}
/**
 * This interface was referenced by `HomeModel`'s JSON-Schema
 * via the `definition` "HomeSetup".
 */
export interface HomeSetup1 {
  /**
   * the guided setup was gone through (or skipped to its end): it no longer opens by itself
   */
  isFinished: boolean;
  /**
   * the checklist of next steps put away; it is shown again from the house's settings
   */
  isChecklistHidden?: boolean;
}
