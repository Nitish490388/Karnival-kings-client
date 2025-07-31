"use client";

import * as React from "react";
import { Link, LinkProps } from "react-router-dom";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  // {
  //   title: "Create a match day contribution",
  //   href: "/cashflow/matchday/add-contribution",
  //   description: "Create a session for tracking expences and collections. ",
  // },
  {
    title: "Add Expenses",
    href: "/cashflow/matchday/add-expense",
    description: "Add expences if you spent your money on the match day.",
  },
  {
    title: "View Data",
    href: "/cashflow/matchday/view-data",
    description:
      "View all expenses and collected amount data from team players.",
  },
  {
    title: "Checklist",
    href: "/checklist",
    description:
      "Check if there is anything you have to pay or you will get refunded.",
  },
];

export function CashflowNav() {
  return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>For Equipements</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 w-[300px] md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      to="/cashflow/equip/add-expense"
                    >
                      {/* <Icons.logo className="h-6 w-6" /> */}
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Add Expense
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Add here wherever you spend your money for the team's
                        cricket equipment.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                {/* <ListItem to="/cashflow/equip/view-data" title="View Data">
                  View all expenses and collected amount data from team players.
                </ListItem>
                <ListItem to="/cashflow/eqip/chcklist" title="Checklist">
                  Check if there is anything you have to pay or you will get
                  refunded.
                </ListItem> */}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Match Day</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    to={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {/* <Link to="/docs">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link> */}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
  );
}


const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  LinkProps & { className?: string; title: string; children: React.ReactNode }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
