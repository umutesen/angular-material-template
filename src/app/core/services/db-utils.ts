export function convertSnaps<T>(results)  {
    return <T[]> results.docs.map(snap => {
        return {
            id: snap.id,
            ...<any>snap.data()
        }
    })

}

export function convertValueChanges<T>(results)  {
    return <T[]> results.docs.map(snap => {
        const data = snap.payload.doc.data();
        const id = snap.payload.doc.id;
        return  { id, ...data };
    })

}