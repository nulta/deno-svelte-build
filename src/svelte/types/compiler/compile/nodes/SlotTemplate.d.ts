import Component from '../Component';
import TemplateScope from './shared/TemplateScope';
import Node from './shared/Node';
import Let from './Let';
import Attribute from './Attribute';
import { INode } from './interfaces';
import ConstTag from './ConstTag';
export default class SlotTemplate extends Node {
    type: 'SlotTemplate';
    scope: TemplateScope;
    children: INode[];
    lets: Let[];
    const_tags: ConstTag[];
    slot_attribute: Attribute;
    slot_template_name: string;
    constructor(component: Component, parent: INode, scope: TemplateScope, info: any);
    validate_slot_template_placement(): void;
}
