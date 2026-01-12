// dependencies
import { Link, useLocation } from 'react-router-dom'
// icons
import { HomeIcon } from '../../utils/iconHandler'
// util
import { capitiliseFirstLetter } from '../../utils/stringManipulation'
// style
import styles from './css/Breadcrumbs.module.css'


export const Breadcrumbs = () => {
    // get url path
    const { pathname } = useLocation()

    // split path into array of segments
    const pathSegments = pathname
        .split("/")
        .filter(Boolean)


    // for each path segment
    const crumbs = pathSegments.map((segment, index) => {
        // check this is last segment (bool)
        const isLast = index === pathSegments.length - 1
        // setup path for link
        let to = ""
        if (!isLast) to = "/" + pathSegments.slice(0, index + 1).join("/")
        
        // capitilise first letter of sement for label
        const label = capitiliseFirstLetter(
            decodeURIComponent(segment)
        )

        return (
            <div className={styles.crumb} key={to}>
                { segment === "dashboard" ? (
                    <Crumb 
                        isHome={true} 
                        isLast={isLast}
                        isLink={!isLast} 
                        to={to}
                        label={label} 
                    />
                ) : (
                    <Crumb 
                        isHome={false} 
                        isLast={isLast}
                        isLink={!isLast} 
                        to={to}
                        label={label} 
                    />
                )}
                {!isLast && <span className={styles.crumbArrow}>/</span>}
            </div>
        )
    })

    return (
        <div className={styles.breadcrumbs}>
            {crumbs}
        </div>
    )
}

const Crumb = ({ isHome, isLast, isLink, to, label }) => {
    // custom for home
    const content = isHome ? (
        <div className={[styles.homeCrumb, isLast && styles.fianlSegment].join(" ")}>
            <span className={styles.icon}>
                <HomeIcon />
            </span>
            <span className={styles.homeCrumbText}>Dashboard</span>
        </div>
    ) : isLast ? (
        // final segment
        <span className={styles.fianlSegment}>{label}</span>
    ) : (
        // regular link
        <span>{label}</span>
    )

    return (
        // style dependent on link
        <span className={[styles.crumbText, isLink && styles.crumbLink].join(" ")}>
            {isLink ? (
                <Link to={to}>{content}</Link>
            ) : (
                content
            )}
        </span>
    )
}