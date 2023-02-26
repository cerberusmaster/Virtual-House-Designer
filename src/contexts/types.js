
// data.json types
const FSlot = {
    furniture: {
        furnitureId: number,
        furnitureColourId: number
    },
    item: Transform[100]
}

const Colour = {
    furnitureColourId: number,
    name: string,
    materialName: string,
    tags: string,
    path: string,
    price: number,
    sku: string
}

const FurnitureItem = {
    furnitureId: number,
    colour: Colour,
    isARWall: boolean,
    name: string,
    width: number,
    depth: number,
    height: number,
    description: string
}

const PreplacedFurnitureItem = {
    furnitureId: number,
    furnitureColourId: number,
    position: Position,
    rotation: Rotation
}

// 

const Position = {
    x: number,
    y: number,
    z: number
}

const Rotation = {
    x: number,
    y: number,
    z: number
}

const Transform = {
    position: Position,
    rotation: Rotation
}

const Furniture = {
    position: { x: number, y: number, z: number },
    rotation: { x: number, y: number, z: number },
    furnitureId: number,
    furnitureColourId: number,
    colour: Colour,
    // name: string,
    // width: number,
    // depth: number,
    // height: number,
    // description: string
}