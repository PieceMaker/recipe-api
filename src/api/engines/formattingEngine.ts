import { mongoRecord, record } from "../../types/record";

export function escapePattern (pattern: string): string {
    return pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

export function fromMongoRecord<T extends mongoRecord>({ _id, ...rest }: T):
    { id: string; } & Pick<T, Exclude<keyof T, "_id">> {
    return {
        id: _id,
        ...rest
    };
}

export function toMongoRecord<T extends record>({ id, ...rest }: T):
    { _id: string; } & Pick<T, Exclude<keyof T, "id">> {
    return {
        _id: id,
        ...rest
    };
}