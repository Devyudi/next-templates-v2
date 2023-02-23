import MetaHead from "@moonlay/src/components/shared-layout/meta.head";

export default function MyProfile(props){
    return (
        <>
            <MetaHead
                head={{
                    title:"Profile",
                    description:"My Profile"
                }}
            />
            <p>Profile</p>
        </>
    )
}