class Splitter implements Splittable {
  split(): string[] {
    return ['split'];
  }
}

class Validator extends Splitter implements Splittable, Validatable {
  validate(): boolean {
    return true;
  }
}

class ISBN extends Validator implements Validatable {

}

export {
  ISBN,
};
