import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

interface AppBreadcrumbProps extends React.ComponentProps<"div"> {
  dirs: IBreadcrumItem[];
  current: string;
}

export default function AppBreadcrumb(props: AppBreadcrumbProps) {
  return (
    <div {...props}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {props.dirs.map((dir) => (
            <Fragment key={dir.title}>
              <BreadcrumbItem>
                <BreadcrumbLink href={dir.href}>{dir.title}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          ))}
          <BreadcrumbItem>
            <BreadcrumbPage>{props.current}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
